import { index, pgTable, uuid } from "drizzle-orm/pg-core";
import authorTable from "./author.schema";
import BookTable from "./book.schema";
import { relations } from "drizzle-orm";

const authorBookMappingTable = pgTable(
  "AuthorBookMappingTable",
  {
    authorId: uuid("authorId")
      .references(() => authorTable.id)
      .notNull(),
    bookId: uuid("bookId")
      .references(() => BookTable.id)
      .notNull(),
  },
  (table) => ({
    authorIdIndex: index("idx_author_id").on(table.authorId),
    bookIdIndex: index("idx_book_mapping_id").on(table.bookId),
  })
);

export const authorBookMappingTableRelations = relations(
  authorBookMappingTable,
  ({ one }) => ({
    book: one(BookTable, {
      fields: [authorBookMappingTable.bookId],
      references: [BookTable.id],
    }),
    author: one(authorTable, {
      fields: [authorBookMappingTable.authorId],
      references: [authorTable.id],
    }),
  })
);

export default authorBookMappingTable;
