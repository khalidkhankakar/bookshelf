"use server";

import { eq } from "drizzle-orm";
import { UserTable, VerificationTokenTable } from "../db/schema";
import { db } from "../db/drizzle";

export const findByTokenAndVerify = async (token: string) => {
  const getToken = await db
    .select()
    .from(VerificationTokenTable)
    .where(eq(VerificationTokenTable.token, token));

  if (!getToken || !getToken[0])
    return { error: "Token not found verification failed" };
  if (!getToken[0].expires)
    return { error: "Token not found verification failed" };
  const hasExpired = new Date() > new Date(getToken[0].expires);

  if (hasExpired) return { error: "Token expired" };

  if (!getToken[0]?.userId)
    return { error: "Token not found, verification failed" };

  const getUser = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.id, getToken[0].userId));

  if (!getUser || getUser.length === 0)
    return { error: "Invalid token or User doesn't exist in the database" };

  // Update user and set emailVerified to true
  await db
    .update(UserTable)
    .set({ emailVerified: true })
    .where(eq(UserTable.email, getUser[0].email))
    .returning({ updatedId: UserTable.id });

    if (getToken[0].id !== null && getToken[0].id !== undefined) {
        await db
          .delete(VerificationTokenTable)
          .where(eq(VerificationTokenTable.id, getToken[0].id));
      } else {
        return { error: "Invalid token data, unable to delete the token" };
      }

  return { success: 'Email verified successfully' };
};
