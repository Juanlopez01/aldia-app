import NextAuth, { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { config } from "dotenv";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import conn from "../../../src-backend/db";
import { User } from "../../../models/user.model";
import { compare } from "bcrypt";
config();

const clientId: string = process.env.CLIENT_ID || "";
const clientSecret: string = process.env.CLIENT_SECRET || "";
const issuer: string = process.env.DOMAIN || "";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    Auth0Provider({
      clientId,
      clientSecret,
      issuer,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        await conn();

        // verifico si ya existe
        const user = await User.findOne({
          email: credentials?.email,
        });

        // Si no existe
        if (!user) {
          throw new Error("Email is not registered");
        }

        // checkeo la password hasheada
        const isPasswordCorrect = await compare(
          credentials!.password,
          user.hashedPassword
        );

        // Si es incorrecta
        if (!isPasswordCorrect) {
          throw new Error("Password is incorrect");
        }

        return user;
      },
    }),
    
  ],

  theme: {
    colorScheme: "dark",
  },
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
