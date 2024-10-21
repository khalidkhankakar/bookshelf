import { index, pgTable, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import UserTable from "./user.schema";
import BookTable from "./book.schema";
import { relations } from "drizzle-orm";

const userHaveToReadBooksTable = pgTable(
  "UserHaveToReadBooksTable",
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
    userIdIndex: index("idx_user_id_have_to_read").on(table.userId),
    bookIdIndex: index("idx_book_id_have_to_read").on(table.bookId),
    uniqueUserIdAndBookId: uniqueIndex(
      "unique_user_id_and_book_id_have_to_read"
    ).on(table.userId, table.bookId),
  })
);

export const userHaveToReadBooksRelations = relations(
  userHaveToReadBooksTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [userHaveToReadBooksTable.userId],
      references: [UserTable.id],
    }),
    book: one(BookTable, {
      fields: [userHaveToReadBooksTable.bookId],
      references: [BookTable.id],
    }),
  })
);

export default userHaveToReadBooksTable;
