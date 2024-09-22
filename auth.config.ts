import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { findUserByEmail } from "./lib/actions/user.actions";
import bycrypt from "bcryptjs";
import { signInSchema } from "./lib/types";

export default {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        // Validate incoming credentials using zod schema
        const validFields = signInSchema.safeParse(credentials);
        if (!validFields.success) return null;

        const { email, password } = validFields.data;

        // Find user by email
        const user = await findUserByEmail(email);
        if (!user || !user.password) return null;

        // Compare passwords
        const passwordMatch = await bycrypt.compare(password, user.password);
        if (!passwordMatch) return null;

        if(!user.emailVerified) return null
        // Return the user object that satisfies NextAuth's User type
        return {
          id: user.id as string,
          name: user.name as string,
          email: user.email as string,
          image: user.image ? (user.image as string) : "",
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
