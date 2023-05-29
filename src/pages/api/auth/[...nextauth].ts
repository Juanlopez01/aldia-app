import NextAuth, { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { config } from "dotenv";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import { createGoogleUser, loginEmailUser, registerNewUser, validateSession } from "@/utils/auth";
config();

const clientId: string = process.env.AUTH0_CLIENT_ID || "";
const clientSecret: string = process.env.AUTH0_CLIENT_SECRET || "";
const issuer: string = process.env.DOMAIN || "";




export const authOptions: NextAuthOptions = {
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

        const { action  } = req.body as { action: string; }

        if (action === 'register'){
        const user = await  registerNewUser({...credentials })
        if(user instanceof Error) throw new Error(user.message)
        return user
        }else if (action === 'login'){
          return await loginEmailUser({...credentials})
        }
        throw new Error('Action not implemented')
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
    const user = await validateSession(session.user?.email)
      return {...session, user} // The return type will match the one returned in `useSession()`
    },
    async signIn({ account, profile ,credentials,email,user }) {
      console.log({ account, profile,credentials,email,user});

      if (account?.provider === "google") {
        // @ts-ignore
        const { email_verified, given_name:name , family_name:lastname, email, sub,picture: image} = profile
        const isVerified = email_verified && profile?.email?.endsWith("@gmail.com") 
        if(!isVerified) return false
        const user = await createGoogleUser({name ,lastname, email, password: sub, image })
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
