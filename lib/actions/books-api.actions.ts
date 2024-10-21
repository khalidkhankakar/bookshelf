"use server";
import { count, eq } from "drizzle-orm";
import { db } from "../db/drizzle";

import { SearchParams } from "../types";
import { ITEMS_PER_PAGE } from "../constant";
import { authorBookMappingTable, bookCategoryMappingTable, bookCategoryTable, BookTable, UserBooksTable } from "../db/schemas";
import { revalidatePath } from "next/cache";

export const fetchBookById = async (id: string): Promise<any> => {
  try {
    const book = await db.query.BookTable.findFirst({
      where: eq(BookTable.id, id),
      with: {
        category: {
          with: {
            category: true,
          },
        },
        author: {
          with: {
            author: true,
          },
        },
      },
    });

    const bookCategoryArr = book?.category?.map(
      (category: any) => category.category
    );
    const bookAuthorArr = book?.author?.map((author: any) => author.author);
    return { book, bookCategoryArr, bookAuthorArr };
  } catch (error) {
    console.log(error);
  }
};

export const deleteBookById = async (bookId: string, userId: string) => {
  try {
    await db.delete(UserBooksTable).where(eq(UserBooksTable.bookId, bookId));
    await db.delete(authorBookMappingTable).where(eq(authorBookMappingTable.bookId, bookId));
    await db.delete(bookCategoryMappingTable).where(eq(bookCategoryMappingTable.bookId, bookId));

    // Then, delete the book from BookTable
    const deletedBook = await db
      .delete(BookTable)
      .where(eq(BookTable.id, bookId))
      .returning({ deletedId: BookTable.id });

    if (!deletedBook) return { success: false };
    revalidatePath(`/profile/${userId}`);
    return { success: true };
  } catch (error) {
    console.log({ error });
    return { success: false };
  }
};

export const fetchBooks = async (
  category: string,
  searchParams: SearchParams
) => {
  const requestedPage = Math.max(1, Number(searchParams?.page) || 1);

  const offset = (Number(requestedPage) - 1) * ITEMS_PER_PAGE;
  if (category == "all") {
    const books = await db.query.BookTable.findMany({
      limit: ITEMS_PER_PAGE,
      offset,
      with: {
        author: {
          with: {
            author: true,
          },
        },
      },
    });
    return books;
  }

  const books = await db.query.bookCategoryTable.findMany({
    limit: ITEMS_PER_PAGE,
    offset,
    where: eq(bookCategoryTable.name, category),
    with: {
      books: {
        with: {
          book: {
            with: {
              author: {
                with: {
                  author: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const booArr = books.map((singleBook: any) => singleBook.books[0].book);
  return booArr;
};

export const estimatedTotalBooks = async (category: string) => {
  let totalResults = 0;
  if (category == "all") {
    // Todo apply filters
    const allRes = await db.select({ count: count() }).from(BookTable);
    totalResults = allRes[0].count || 0;
    // Calculate total number of pages
    const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);

    return { totalResults, totalPages };
  } else if (category == "publisher") {
    const allRes = await db
      .select({ count: count() })
      .from(BookTable)
      .where(eq(BookTable.publisher, category));
    totalResults = allRes[0].count || 0;
    const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);
    return { totalResults, totalPages };
  }

  // Todo apply filters
  const allRes = await db
    .select({ count: count() })
    .from(bookCategoryTable)
    .where(eq(bookCategoryTable.name, category));
  totalResults = allRes[0].count || 0;
  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);
  return { totalResults, totalPages };
};

export const fetchBookByPublisher = async (
  publisher: string,
  searchParams: SearchParams
) => {
  const requestedPage = Math.max(1, Number(searchParams?.page) || 1);
  const offset = (Number(requestedPage) - 1) * ITEMS_PER_PAGE;
  const books = await db.query.BookTable.findMany({
    limit: ITEMS_PER_PAGE,
    offset,
    where: eq(BookTable.publisher, publisher),
    with: {
      author: {
        with: {
          author: true,
        },
      },
    },
  });
  return books;
};
