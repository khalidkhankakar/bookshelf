import { index, pgTable, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import UserTable from "./user.schema";
import BookTable from "./book.schema";
import { relations } from "drizzle-orm";

const userCurrentlyReadingBooksTable = pgTable(
  "userCurrentlyReadingBooksTable",
  {
    id: uuid("id").defaultRandom(),
    userId: uuid("userId")
      .references(() => UserTable.id)
      .notNull(),
    bookId: uuid("bookId")
      .references(() => BookTable.id)
      .notNull(),
  },
  (table) => ({
    userIdIndex: index("idx_user_id_currently_reading").on(table.userId),
    bookIdIndex: index("idx_book_id_currently_reading").on(table.bookId),
    uniqueUserIdAndBookId: uniqueIndex(
      "unique_user_id_and_book_id_currently_reading"
    ).on(table.userId, table.bookId),
  })
);

export const userCurrentlyReadingBooksReations = relations(
  userCurrentlyReadingBooksTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [userCurrentlyReadingBooksTable.userId],
      references: [UserTable.id],
    }),
    book: one(BookTable, {
      fields: [userCurrentlyReadingBooksTable.bookId],
      references: [BookTable.id],
    }),
  })
);

export default userCurrentlyReadingBooksTable;
