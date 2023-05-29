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
import { sendVerificationRequest } from "@/utils/nodemailer";
import { sign } from 'jsonwebtoken'
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
try {
  const userExist = await User.findOne({ email }).exec();
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
  emailVerified: true,
  provider,
})

const userSaved = await newUser.save()
console.log(userSaved);
return userSaved;

 }catch (error) {

   console.log(error)
 }
}




interface RegisterNewUser { name?:string, lastname?: string, email?: string, password?: string }

const registerNewUser = async ({ name, lastname, email, password }:RegisterNewUser)=>{
  if(!email || !password) return false;
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) throw new Error('Ya existe una cuenta con ese email')
    const hashedPassword = await hash(password, 12);
    
      const newUser = new User({
        name,
        lastname,
        email,
        hashedPassword,
        provider: 'email',
      })
      const userSaved = await newUser.save()
      const token = sign({ id: newUser._id}, process.env.NEXTAUTH_JWT_SECRET || '' )  
      const url = `${process.env.URL_BASE}/api/validate-email?token=${token}`
      await sendVerificationRequest({ email: email, url })
      return userSaved

  } catch (error) {
   console.log(error);
   return error
  }
}






export const authOptions: NextAuthOptions = {
  // adapter: MongoDBAdapter(clientPromise),
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
      async authorize(credentials, req ) {
        await conn()
        console.log(credentials);
        console.log(req)
        // @ts-ignore
        const { action  } = req.body

        if (action === 'register'){
        const user = await  registerNewUser({...credentials })
        if(user instanceof Error) throw new Error(user.message)
        return user
        }
        // // verifico si ya existe
        const user = await User.findOne({
        email: credentials?.email,
        })

        // // Si no existe
        // if (!user) {
        //   throw new Error('Email is not registered')
        // }

        // // checkeo la password hasheada
        // const isPasswordCorrect = await compare(
        //   credentials!.password,
        //   user.hashedPassword
        // )

        // // Si es incorrecta
        // if (!isPasswordCorrect) {
        //   throw new Error('Password is incorrect')
        // }
        return user
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
    await conn()
    const user = await User.findOne({email: session.user?.email})
    if(!user.emailVerified) throw new Error('Email is not verified')
      return {...session, user} // The return type will match the one returned in `useSession()`
    },
    async signIn({ account, profile ,credentials,email,user }) {
      console.log({ account, profile,credentials,email,user});

      if (account?.provider === "google") {
        // @ts-ignore
        const { email_verified, given_name:name , family_name:lastname, email, sub,picture: image} = profile
        const isVerified = email_verified && profile?.email?.endsWith("@gmail.com") 
        if(!isVerified) return false
        const user = await createUser({name ,lastname, email, password: sub , provider: 'google', image })
        return user
      } 
      
      return true // Do different verification for other providers that don't have `email_verified`
    },
    jwt({ token }) {
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
