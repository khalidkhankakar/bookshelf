import NextAuth from "next-auth";

import authConfig from "./auth.config";
import { findUserByEmail } from "./lib/actions/user.actions";
import { db } from "./lib/db/drizzle";
import { UserTable } from "./lib/db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      // find user by email
      let userExists;
      if (user?.email) {
        userExists = await findUserByEmail(user?.email);
        if (userExists && userExists?.provider !== account?.provider) return false;
      }
      if (
        (account?.provider === "google" || account?.provider === "github") &&
        !userExists &&
        user?.email &&
        user?.name &&
        user?.image &&
        user?.id
      ) {
        // create the user in the database
        const response = await db
          .insert(UserTable)
          .values({
            id: user?.id,
            email: user?.email,
            name: user?.name,
            emailVerified: true,
            image: user?.image,
            provider: account?.provider,
          })
          .returning();
        if (!response) return false;
        return true;
      }

      if (
        userExists?.provider === "credentials" &&
        !userExists?.emailVerified
      ) {
        // TODO: send email
        return false;
      }

      return true;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },

    async jwt({ token }) {
      return token;
    },
  },
  ...authConfig,
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/auth-error",
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
});
