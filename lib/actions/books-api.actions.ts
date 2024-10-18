"use server";
import { count, eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { bookCategoryTable, BookTable } from "../db/schema";
import { SearchParams } from "../types";
import { ITEMS_PER_PAGE } from "../constant";

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
  }
  else if(category == "publisher"){
    const allRes = await db.select({ count: count() }).from(BookTable).where(eq(BookTable.publisher, category));
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

export const fetchBookByPublisher = async (publisher: string,searchParams: SearchParams) => {
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
