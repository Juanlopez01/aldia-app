import NextAuth, { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { config } from "dotenv";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import clientPromise from "../../../lib/mongodb";
import conn from "../../../src-backend/db";
import { User } from "../../../models/user.model";
import { compare, hash } from "bcrypt";
import EmailProvider from "next-auth/providers/email";
import { sendVerificationRequest } from "@/utils/nodemailer";
config();

const clientId: string = process.env.AUTH0_CLIENT_ID || "";
const clientSecret: string = process.env.AUTH0_CLIENT_SECRET || "";
const issuer: string = process.env.DOMAIN || "";

interface CreateUserParams {
  name?: string;
  lastname?: string;
  email: string;
  password: string;
  provider: string;
  image?: string;
}

const createUser = async ({ name,lastname, email, password, provider, image}:CreateUserParams)=> {
await conn()
console.log({ name,lastname, email, password, provider});
try {
  
  
  const userExist = await User.findOne({ email: email });

if (userExist) {
  const { hashedPassword, provider: userProvider } = userExist
  if (userProvider !== provider){
    return false
  }

  const isGoodPassword = compare(password, hashedPassword)
  return isGoodPassword
}

const hashedPassword = await hash(password, 12);

const newUser = new User({
  name,
  lastname,
  email,
  image,
  hashedPassword,
  provider,
})

const userSaved = await newUser.save()
console.log(userSaved);
return userSaved;

 }catch (error) {

   console.log(error)
 }
}
export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    Auth0Provider({
      clientId,
      clientSecret,
      issuer,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
    EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: Number(process.env.EMAIL_SERVER_PORT),
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD
          }
        },
        from: process.env.EMAIL_FROM,
        sendVerificationRequest,
        

    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials,req) {
        await conn()
console.log(credentials);
console.log(req);
        // verifico si ya existe
        const user = await User.findOne({
        email: credentials?.email,
        })

        // Si no existe
        if (!user) {
          throw new Error('Email is not registered')
        }

        // checkeo la password hasheada
        const isPasswordCorrect = await compare(
          credentials!.password,
          user.hashedPassword
        )

        // Si es incorrecta
        if (!isPasswordCorrect) {
          throw new Error('Password is incorrect')
        }

        return user
      },
    }),
  ],
  callbacks: {
    session({ session, token, user,trigger,newSession }) {
      console.log({session, token, user,trigger,newSession});
      return {...session, role: "user"} // The return type will match the one returned in `useSession()`
    },
    async signIn({ account, profile ,credentials,email,user }) {
      console.log({ account, profile,credentials,email,user});

      if (account?.provider === "google") {
        // @ts-ignore
        const { email_verified, given_name:name , family_name:lastname, email, sub,picture: image} = profile
        const isVerified = email_verified && profile?.email?.endsWith("@gmail.com") 
        if(!isVerified) return false
        const user = await createUser({name ,lastname, email, password: sub , provider: 'google', image })
        return Boolean(user)
      } 
      
      return true // Do different verification for other providers that don't have `email_verified`
    },
    jwt({ token, user, account, profile, trigger }) {
      return token
    },
  },
  theme: {
    colorScheme: 'dark',
  },
  pages: {
    signIn: '/auth',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);
