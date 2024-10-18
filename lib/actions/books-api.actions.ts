"use server";
import { and, count, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "../db/drizzle";
import { bookCategoryTable, BookTable } from "../db/schema";
import { SearchParams } from "../types";

export const fetchBookById = async (id: string) => {
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

const ITEMS_PER_PAGE = 4;

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

export const estimatedTotalBooks = async (
  category: string,
  searchParams: SearchParams
) => {
  let totalResults = 0;
  if (category == "all") {
    // Todo apply filters
    const allRes = await db.select({ count: count() }).from(BookTable);
    totalResults = allRes[0].count || 0;
    // Calculate total number of pages
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

const ratingFilter = (rtg?: string) => {
  if (rtg) {
    const minRating = Number(rtg);
    return sql`${BookTable.rating} >= ${minRating}`;
  }
  return undefined;
};

// TODO Refactor this
const yearFilter = (yr?: string) => {
  if (yr) {
    const maxYear = Math.max(1950, Math.min(2023, Number(yr)));
    return and(
      gte(BookTable.publishedAt, new Date(1950, 0, 1)), // Jan 1st, 1950
      lte(BookTable.publishedAt, new Date(maxYear, 11, 31)) // Dec 31st, maxYear at 23:59:59
    );
  }
  return and(
    gte(BookTable.publishedAt, new Date(1950, 0, 1)),
    lte(BookTable.publishedAt, new Date(2023, 11, 31))
  );
};

export const fetchBookByPublisher = async (publisher: string) => {
  //     const books = await db.select().from(BookTable).where(eq(BookTable.publisher, publisher),
  //     with:{
  //         author:{
  //             with:{
  //                 author:true
  //             }
  //         }
  //     }

  // );
  const books = await db.query.BookTable.findMany({
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
