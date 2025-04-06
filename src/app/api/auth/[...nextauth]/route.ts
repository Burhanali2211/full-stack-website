// This file has been disabled since we're using Supabase auth instead of NextAuth
// Keep this file for reference only

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Disable NextAuth route handler
export const disabled = true;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // This function would normally authenticate users
        // But we're using Supabase auth instead
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
});

export { handler as GET, handler as POST }; 