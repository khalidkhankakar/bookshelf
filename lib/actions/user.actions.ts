"use server";

import { z } from "zod";
import { BookFormValidation, signUpSchema } from "../types";
import bycrypt from "bcryptjs";
import { db } from "../db/drizzle";
import { BookTable, UserBooksTable, UserTable, VerificationTokenTable } from "../db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { sendEmail } from "./resend-email.actions";
import { storage } from "@/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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

  if (!tokenId[0].id)
    return { success: false, message: "User token is not created try again" };
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



export const uploadBook = async (formData: FormData) => {
  const userId = formData.get('userId');
  const userIdStr = String(formData.get('userId'))
  if (!userId) return { success: false, message: 'User does not exist' };

  const { success, data, error } = BookFormValidation.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    author: formData.get('author'),
    bookCoverImg: formData.getAll('bookCoverImg'),
    bookPDF: formData.getAll('bookPDF'),
    isFree: Boolean(formData.get('isFree')),
    price: formData.get('price') ? formData.get('price') as string: '0', // Ensure price is a float or undefined
    category: formData.get('category'),
    publisher: formData.get('publisher'),
    publishedAt: formData.get('publishedAt'),
  });

  if (!success) return { success: false, message: "Validation failed", error: error.format() };

  // check the user if exists
  const userExists =  await db
  .select()
  .from(UserTable)
  .where(eq(UserTable.id, userIdStr));

  if(!userExists[0]) return { success: false, message: 'User does not exist' };



  const { bookCoverImg, bookPDF } = data;
  // Create references for both the book cover image and book PDF
  const bookCoverImgRef = ref(storage, `books/covers/${bookCoverImg[0].name}`);
  const bookPDFRef = ref(storage, `books/pdfs/${bookPDF[0].name}`);

  // Set metadata for the PDF upload
  const metadata = {
    contentType: bookPDF[0].type, // Set the content type
    customMetadata: {
      originalName: bookPDF[0].name, // Store the original name
    },
  };

  // Upload tasks for both files
  const uploadCoverImgTask = uploadBytesResumable(bookCoverImgRef, bookCoverImg[0], {
    contentType: bookCoverImg[0].type,
  });

  const uploadPDFTask = uploadBytesResumable(bookPDFRef, bookPDF[0], metadata);

  // Wait for both uploads to complete
  await Promise.all([uploadCoverImgTask, uploadPDFTask]);

  // Get download URLs for both uploaded files
  const bookCoverImgUrl = await getDownloadURL(bookCoverImgRef);
  const bookPDFUrl = await getDownloadURL(bookPDFRef);

  // Convert price to number (if price exists) and handle free books
 // If isFree, set price to 0, else convert price to number

  // Insert the book data into the database
  const bookData = {
    title: data.title as string,
    description: data.description as string,
    userId: userId as string, // Ensure userId is a string
    author: data.author as string,
    image: bookCoverImgUrl,
    bookPdf: bookPDFUrl,
    isFree: data.isFree,
    price: parseFloat(data.price || '0'), // Ensure price is a number
    category: data.category,
    publisher: data.publisher,
    publishedAt: new Date(data.publishedAt), // Ensure publishedAt is a Date object
  };

  try {
    const uploadedBookId = await db.insert(BookTable).values(bookData).returning({ id: BookTable.id });

    if (!uploadedBookId[0].id ) {
      return { success: false, message: "Book upload failed" };
    }

    await db.insert(UserBooksTable).values({ userId:userIdStr, bookId: uploadedBookId[0].id });

    return { success: true, message: "Upload successful" };
  } catch (insertError) {
    console.error("Database insert error:", insertError);
    return { success: false, message: "Database insertion failed", error: insertError };
  }
};
