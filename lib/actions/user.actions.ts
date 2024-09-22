"use server";

import { z } from "zod";
import { signUpSchema } from "../types";
import bycrypt from "bcryptjs";
import { db } from "../db/drizzle";
import { UserTable, VerificationTokenTable } from "../db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { sendEmail } from "./resend-email.actions";

export const createUser = async (values: z.infer<typeof signUpSchema>) => {
  const validatedValues = signUpSchema.safeParse(values);
  if (!validatedValues.success) {
    return { success: false, message: "validation failed" };
  }

  const { username, email, password } = validatedValues.data;

  const existsUser = await findUserByEmail(email);
  if (existsUser) {
    return { success: false, message: "user already exists" };
  }

  const hashedPassword = await bycrypt.hash(password, 10);

  const userId = await db
    .insert(UserTable)
    .values({
      email,
      name: username,
      password: hashedPassword,
      emailVerified: false,
      provider: "credentials",
    })
    .returning({ id: UserTable.id });
  if (!userId)
    return { success: false, message: "user is not created try again" };

  // TODO: create the token
  const randomUUID = crypto.randomUUID();
  const tokenId = await db
    .insert(VerificationTokenTable)
    .values({
      userId: userId[0].id,
      token: randomUUID,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    })
    .returning({ id: VerificationTokenTable.id });

  if (!tokenId[0].id) return { success: false, message: "User token is not created try again" };
  // send verification email
  const response = await sendEmail({
    name: username,
    email,
    token: randomUUID,
  });
  if (!response.success) return { success: false, message: response.message };

  return { success: true, message: "Email is sent successfully" };
};

export const findUserByEmail = async (email: string) => {
  const user = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.email, email));

  return user[0]; // Return the first user or undefined
};
