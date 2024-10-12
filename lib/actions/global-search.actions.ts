"use server";
import { sql } from "drizzle-orm";
import { db } from "../db/drizzle";
import { bookCategoryTable, BookTable, UserTable } from "../db/schema";

export const fetchGlobalResults = async ({
  query,
  category,
}: {
  query: string;
  category?: string; // Optional category
}) => {
  if (!query || query.length <= 0) return [];

  let result: any = [];

  // Search within the specified category
  if (category === "publisher") {
    // Add publisher search here if needed
    const queryResult = await db
      .select({
        id: BookTable.id,
        title: BookTable.publisher,
      })
      .from(BookTable)
      .where(sql`similarity(${BookTable.publisher}, ${query}) > 0.01`)
      .orderBy(sql`similarity(${BookTable.publisher}, ${query}) DESC`)
      .limit(5);

    return queryResult.map((item) => ({ ...item, type: "publisher" }));
  }

  if (category === "book") {
    const queryResult = await db
      .select({
        id: BookTable.id,
        title: BookTable.title,
      })
      .from(BookTable)
      .where(sql`similarity(${BookTable.title}, ${query}) > 0.01`)
      .orderBy(sql`similarity(${BookTable.title}, ${query}) DESC`)
      .limit(5);

    return queryResult.map((item) => ({ ...item, type: "book" }));
  }

  if (category === "author") {
    const queryResult = await db
      .select({
        id: UserTable.id,
        title: UserTable.name,
      })
      .from(UserTable)
      .where(sql`similarity(${UserTable.name}, ${query}) > 0.01`)
      .orderBy(sql`similarity(${UserTable.name}, ${query}) DESC`)
      .limit(5);
    return queryResult.map((item) => ({ ...item, type: "author" }));
  }

  if (category === "category") {
    const queryResult = await db
      .select({
        id: bookCategoryTable.id,
        title: bookCategoryTable.name,
      })
      .from(bookCategoryTable)
      .where(sql`similarity(${bookCategoryTable.name}, ${query}) > 0.01`)
      .orderBy(sql`similarity(${bookCategoryTable.name}, ${query}) DESC`)
      .limit(5);
    const uniqueByTitle = Array.from(
      new Map(queryResult.map((item) => [item.title, item])).values()
    );
    return uniqueByTitle.map((item) => ({ ...item, type: "category" }));
  }

  // Default search across all categories if no category is specified

  const [bookResults, authorResults, categoryResults] = await Promise.all([
    db
      .select({
        id: BookTable.id,
        title: BookTable.title,
      })
      .from(BookTable)
      .where(sql`similarity(${BookTable.title}, ${query}) > 0.01`)
      .orderBy(sql`similarity(${BookTable.title}, ${query}) DESC`)
      .limit(5)
      .then((results) => results.map((item) => ({ ...item, type: "book" }))),

    db
      .select({
        id: UserTable.id,
        title: UserTable.name,
      })
      .from(UserTable)
      .where(sql`similarity(${UserTable.name}, ${query}) > 0.01`)
      .orderBy(sql`similarity(${UserTable.name}, ${query}) DESC`)
      .limit(5)
      .then((results) => results.map((item) => ({ ...item, type: "author" }))),

    db
      .select({
        id: bookCategoryTable.id,
        title: bookCategoryTable.name,
      })
      .from(bookCategoryTable)
      .where(sql`similarity(${bookCategoryTable.name}, ${query}) > 0.01`)
      .orderBy(sql`similarity(${bookCategoryTable.name}, ${query}) DESC`)
      .limit(5)
      .then((results) => {
        const uniqueByTitle = Array.from(
          new Map(results.map((item) => [item.title, item])).values()
        );
        return uniqueByTitle.map((item) => ({ ...item, type: "category" }));
      }),
  ]);

  // Combine all results
  result = [...bookResults, ...authorResults, ...categoryResults];

  return result;
};
