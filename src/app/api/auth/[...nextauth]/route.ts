// This file is temporarily disabled for deployment
// We'll re-enable authentication after deployment is successful

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";

// Import shared auth types
import "@/lib/auth-types";

// Default values for development (never use in production)
const developmentSecret = "THIS_IS_A_DEVELOPMENT_SECRET_CHANGE_IT";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Configure NextAuth
export const authOptions: NextAuthOptions = {
  // Always use environment variable for production; never hardcode secrets
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma) as any, // Cast to any to avoid strict typing issues
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Find user by email
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            select: {
              id: true,
              name: true,
              email: true,
              password: true,
              role: true,
              image: true
            }
          });

          // If no user found or password doesn't match
          if (!user || !(await compare(credentials.password, user.password as string))) {
            return null;
          }

          // Return user without password - cast as User type
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Explicitly configure JWT options to match the secret
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add custom user data to JWT token
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom token data to session
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

// Create the NextAuth handler using our config
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 