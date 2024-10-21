"use server";

import { z } from "zod";
import {
  BookFormValidation,
  SearchParams,
  signUpSchema,
  UserUpdateFormSchema,
} from "../types";
import bycrypt from "bcryptjs";
import { db } from "../db/drizzle";
import {
  authorBookMappingTable,
  authorTable,
  bookCategoryMappingTable,
  bookCategoryTable,
  BookTable,
  UserBooksTable,
  userCurrentlyReadingBooksTable,
  userHaveToReadBooksTable,
  userLikedBooksTable,
  userSavedBooksTable,
  UserTable,
  VerificationTokenTable,
} from "../db/schemas";
import { count, eq } from "drizzle-orm";
import crypto from "crypto";
import { sendEmail } from "./resend-email.actions";
import { storage } from "@/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { revalidatePath } from "next/cache";
import { ITEMS_PER_PAGE } from "../constant";

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
      userId: userId[0].id as string,
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

export const fetchUserProfileById = async (id: string) => {
  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.id, id),
    with: {
      userBooks: {
        with: {
          book: true,
        },
      },

      savedBooks: {
        with: {
          book: true,
        },
      },
      likedBooks: {
        with: {
          book: true,
        },
      },
      haveToReadBooks: {
        with: {
          book: true,
        },
      },
      currentlyReadingBooks: {
        with: {
          book: true,
        },
      },
    },
  });

  return user;
};

export const addAndRemoveBookInSave = async (
  type: boolean,
  bookId: string,
  userId: string
) => {
  if (type) {
    // remove
    const deletedUser = await db
      .delete(userSavedBooksTable)
      .where(eq(userSavedBooksTable.bookId, bookId));
    if (deletedUser) {
      revalidatePath(`book/${bookId}`);
      revalidatePath(`/save/${userId}`);
      return { success: true, message: "Remove successfully" };
    }
    return { success: false, message: "Unable to remove something went wrong" };
  }
  // add
  const insertedUser = await db
    .insert(userSavedBooksTable)
    .values({ bookId, userId });
  if (insertedUser) {
    revalidatePath(`book/${bookId}`);
    revalidatePath(`/save/${userId}`);
    return { success: true, message: "Add successfully" };
  }
  return { success: false, message: "Unable to add something went wrong" };
};

export const addAndRemoveBookInLike = async (
  type: boolean,
  bookId: string,
  userId: string
) => {
  if (type) {
    // remove
    const deletedUser = await db
      .delete(userLikedBooksTable)
      .where(eq(userLikedBooksTable.bookId, bookId));
    if (deletedUser) {
      revalidatePath(`book/${bookId}`);
      revalidatePath(`/fav/${userId}`);
      return { success: true, message: "Unliked successfully" };
    }
    return { success: false, message: "Unable to remove something went wrong" };
  }
  // add
  const insertedUser = await db
    .insert(userLikedBooksTable)
    .values({ bookId, userId });
  if (insertedUser) {
    revalidatePath(`book/${bookId}`);
    revalidatePath(`/fav/${userId}`);
    return { success: true, message: "Liked successfully" };
  }
  return { success: false, message: "Unable to add something went wrong" };
};

export const addAndRemoveBookInHaveToRead = async (
  type: boolean,
  bookId: string,
  userId: string
) => {
  if (type) {
    // remove
    const deletedUser = await db
      .delete(userHaveToReadBooksTable)
      .where(eq(userHaveToReadBooksTable.bookId, bookId));
    if (deletedUser) {
      revalidatePath(`book/${bookId}`);
      return {
        success: true,
        message: "Remove from have to read successfully",
      };
    }
    revalidatePath(`/have-to-read/${userId}`);
    return { success: false, message: "Unable to remove something went wrong" };
  }
  // add
  const insertedUser = await db
    .insert(userHaveToReadBooksTable)
    .values({ bookId, userId });
  if (insertedUser) {
    revalidatePath(`book/${bookId}`);
    revalidatePath(`/have-to-read/${userId}`);
    return { success: true, message: "Added to have to read successfully" };
  }
  return { success: false, message: "Unable to add something went wrong" };
};

export const uploadBook = async (formData: FormData) => {
  // TODO: refactor this function
  const userId = formData.get("userId");
  const userIdStr = String(formData.get("userId"));
  const categoryArr = formData.get("categoryArr");
  const parseCategoryArr = JSON.parse(categoryArr as string);

  if (!userId) return { success: false, message: "User does not exist" };

  const { success, data, error } = BookFormValidation.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    author: formData.get("author"),
    bookCoverImg: formData.getAll("bookCoverImg"),
    bookPDF: formData.getAll("bookPDF"),
    isFree: Boolean(formData.get("isFree")),
    price: formData.get("price") ? (formData.get("price") as string) : "0", // Ensure price is a float or undefined
    category: formData.get("category"),
    publisher: formData.get("publisher"),
    publishedAt: formData.get("publishedAt"),
  });

  if (!success) {
    // Return a more readable error message instead of sending the error object directly
    return {
      success: false,
      message: "Validation failed",
      error: error.errors.map((e: any) => `${e.path}: ${e.message}`).join(", "), // Convert the error object to a readable string
    };
  }

  // Check if user exists
  const userExists = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.id, userIdStr));

  if (!userExists[0]) return { success: false, message: "User does not exist" };

  const { bookCoverImg, bookPDF } = data;
  const bookCoverImgRef = ref(storage, `books/covers/${bookCoverImg[0].name}`);
  const bookPDFRef = ref(storage, `books/pdfs/${bookPDF[0].name}`);

  const metadata = {
    contentType: bookPDF[0].type,
    customMetadata: {
      originalName: bookPDF[0].name,
    },
  };

  // Upload tasks for both files
  const uploadCoverImgTask = uploadBytesResumable(
    bookCoverImgRef,
    bookCoverImg[0],
    {
      contentType: bookCoverImg[0].type,
    }
  );

  const uploadPDFTask = uploadBytesResumable(bookPDFRef, bookPDF[0], metadata);

  await Promise.all([uploadCoverImgTask, uploadPDFTask]);

  const bookCoverImgUrl = await getDownloadURL(bookCoverImgRef);
  const bookPDFUrl = await getDownloadURL(bookPDFRef);

  const bookData = {
    title: data.title as string,
    description: data.description as string,
    userId: userId as string,
    image: bookCoverImgUrl,
    bookPdf: bookPDFUrl,
    isFree: data.isFree,
    price: parseFloat(data.price || "0"),
    publisher: data.publisher,
    publishedAt: new Date(data.publishedAt),
  };

  try {
    const uploadedBookId = await db
      .insert(BookTable)
      .values(bookData)
      .returning({ id: BookTable.id });

    if (!uploadedBookId[0].id) {
      return { success: false, message: "Book upload failed" };
    }

    await db
      .insert(UserBooksTable)
      .values({ userId: userIdStr, bookId: uploadedBookId[0].id });

    // TODO: add multiple author functionality
    const authorArr = data.author
      .split(",")
      .map((author: string) => author.trim());

    for (let i = 0; i < authorArr.length; i++) {
      const authorId = await db
        .insert(authorTable)
        .values({ name: authorArr[i] })
        .returning({ id: authorTable.id });

      await db.insert(authorBookMappingTable).values({
        bookId: uploadedBookId[0].id as string,
        authorId: authorId[0].id,
      });
    }

    for (let i = 0; i < parseCategoryArr.length; i++) {
      const categoryId = await db
        .insert(bookCategoryTable)
        .values({ name: parseCategoryArr[i] })
        .returning({ id: bookCategoryTable.id });

      await db.insert(bookCategoryMappingTable).values({
        bookId: uploadedBookId[0].id as string,
        categoryId: categoryId[0].id,
      });
    }

    revalidatePath(`/profile/${userId}`);
    revalidatePath("/explore");

    return { success: true, message: "Upload successful" };
  } catch (insertError) {
    console.error("Database insert error:", insertError);

    // Return a readable error message instead of an object
    return {
      success: false,
      message: "Database insertion failed",
    };
  }
};

type FormDataInput = {
  get(key: string): FormDataEntryValue | null;
};

export const updateUserProfile = async (formData: FormDataInput) => {
  const userId = formData.get("userId") as string | null;
  if (!userId) return { success: false, message: "User does not exist" };

  const { success, data, error } = UserUpdateFormSchema.safeParse({
    name: formData.get("name") as string | null,
    location: (formData.get("location") as string | null) || "",
    twitterUrl: (formData.get("twitterUrl") as string | null) || "",
    instagramUrl: (formData.get("instagramUrl") as string | null) || "",
    bio: (formData.get("bio") as string | null) || "",
  });

  if (!success) {
    return {
      success: false,
      message: "Validation failed",
      error: error.format(),
    };
  }

  let userProfileImgUrl: string | undefined;
  let userCoverImgUrl: string | undefined;

  // upload the user profile image
  const profileImageFile = formData.get("profileImage") as File | null;
  if (profileImageFile && typeof profileImageFile === "object") {
    const profileImageRef = ref(
      storage,
      `user/profile/${profileImageFile.name}`
    );
    await uploadBytesResumable(profileImageRef, profileImageFile);
    userProfileImgUrl = await getDownloadURL(profileImageRef);
  }

  // upload the cover image
  const coverImageFile = formData.get("coverImage") as File | null;
  if (coverImageFile && typeof coverImageFile === "object") {
    const coverImageRef = ref(
      storage,
      `user/coverImage/${coverImageFile.name}`
    );
    await uploadBytesResumable(coverImageRef, coverImageFile);
    userCoverImgUrl = await getDownloadURL(coverImageRef);
  }

  const updatedData = {
    name: data.name || "",
    location: data.location || "",
    twitterUrl: data.twitterUrl || "",
    instagramUrl: data.instagramUrl || "",
    bio: data.bio || "",
    image:
      userProfileImgUrl ||
      (formData.get("profileImage") as string | null) ||
      "",
    coverImage:
      userCoverImgUrl || (formData.get("coverImage") as string | null) || "",
  };

  // update the user in the database
  await db
    .update(UserTable)
    .set(updatedData)
    .where(eq(UserTable.id, userId))
    .returning();

  revalidatePath(`/profile/${userId}`);
  return {
    success: true,
    message: "Updated successfully",
  };
};

export const fetchUserSavedBooks = async (
  userId: string,
  searchParams: SearchParams
) => {
  const requestedPage = Math.max(1, Number(searchParams?.page) || 1);
  const offset = (Number(requestedPage) - 1) * ITEMS_PER_PAGE;
  const savedBooks = await db.query.userSavedBooksTable.findMany({
    limit: ITEMS_PER_PAGE,
    offset,
    where: eq(userSavedBooksTable.userId, userId),
    with: {
      book: {
        with: {
          author:{
            with:{
              author: true
            }
          }
        }
      },
    },
  });
  const savedBooksArr = savedBooks.map((book) => book.book);
  return savedBooksArr;
};

export const estimatedTotalBooksOfUserReactions = async (
  type: "save" | "like" | "havetoRead",
) => {
  let totalResults = 0;

  if (type == "save") {
    const allRes = await db
      .select({ count: count() })
      .from(userSavedBooksTable);
    totalResults = allRes[0].count;
    const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);
    return { totalResults, totalPages };
  }

  if (type == "like") {
    const allRes = await db
      .select({ count: count() })
      .from(userLikedBooksTable);
    totalResults = allRes[0].count;
    const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);
    return { totalResults, totalPages };
  }

  const allRes = await db
    .select({ count: count() })
    .from(userHaveToReadBooksTable);
  totalResults = allRes[0].count;
  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);
  return { totalResults, totalPages };
};

export const fetchUserLikedBooks = async (userId: string, searchParams: SearchParams
) => {
  const requestedPage = Math.max(1, Number(searchParams?.page) || 1);
  const offset = (Number(requestedPage) - 1) * ITEMS_PER_PAGE;

  const likedBooks = await db.query.userLikedBooksTable.findMany({
    limit: ITEMS_PER_PAGE,
    offset,
    where: eq(userLikedBooksTable.userId, userId),
    with: {
      book: {
        with: {
          author:{
            with:{
              author: true
            }
          }
        }
      },
    },
  });
  const likedBooksArr = likedBooks.map((book) => book.book);
  return likedBooksArr;
};

export const fetchUserHaveToReadBooks = async (userId:string, searchParams: SearchParams
) => {
  const requestedPage = Math.max(1, Number(searchParams?.page) || 1);
  const offset = (Number(requestedPage) - 1) * ITEMS_PER_PAGE;
  const userHaveToReadBooks = await db.query.userHaveToReadBooksTable.findMany({
    limit: ITEMS_PER_PAGE,
    offset,
    where: eq(userHaveToReadBooksTable.userId, userId),
    with: {
      book: {
        with: {
          author:{
            with:{
              author: true
            }
          }
        }
      },
    },
  });
  const userHaveToReadBooksArr = userHaveToReadBooks.map((book) => book.book);
  return userHaveToReadBooksArr;
};

export const fetchUserCurrentlyReadingBooks = async (userId: string) => {
  const userCurrentlyReadingBooks =
    await db.query.userCurrentlyReadingBooksTable.findMany({
      where: eq(userCurrentlyReadingBooksTable.userId, userId),
      with: {
        book: true,
      },
    });
  const userCurrentlyReadingBooksArr = userCurrentlyReadingBooks.map(
    (book) => book.book
  );
  return userCurrentlyReadingBooksArr;
};
