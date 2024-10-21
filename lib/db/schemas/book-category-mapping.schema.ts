import { index, pgTable, uuid } from "drizzle-orm/pg-core";
import BookTable from "./book.schema";
import bookCategoryTable from "./book-category.schema";
import { relations } from "drizzle-orm";

const bookCategoryMappingTable = pgTable(
  "BookCategoryMappingTable",
  {
    bookId: uuid("bookId")
      .references(() => BookTable.id)
      .notNull(),
    categoryId: uuid("categoryId")
      .references(() => bookCategoryTable.id)
      .notNull(),
  },
  (table) => ({
    bookIdIndex: index("idx_book_id").on(table.bookId),
    categoryIdIndex: index("idx_category_id").on(table.categoryId),
  })
);

export const bookCategoryMappingRelations = relations(
  bookCategoryMappingTable,
  ({ one }) => ({
    book: one(BookTable, {
      fields: [bookCategoryMappingTable.bookId],
      references: [BookTable.id],
    }),
    category: one(bookCategoryTable, {
      fields: [bookCategoryMappingTable.categoryId],
      references: [bookCategoryTable.id],
    }),
  })
);

export default bookCategoryMappingTable;
