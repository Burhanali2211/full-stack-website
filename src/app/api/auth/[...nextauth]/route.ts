// This file is temporarily disabled for deployment
// We'll re-enable authentication after deployment is successful

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

// A simple NextAuth configuration that can be built successfully
// without relying on external services during build time
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        // During build time, just return null
        // In production with proper env vars, implement actual auth logic
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST }; 