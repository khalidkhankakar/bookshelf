import { index, pgTable, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import UserTable from "./user.schema";
import BookTable from "./book.schema";
import { relations } from "drizzle-orm";

const userLikedBooksTable = pgTable(
  "UserLikedBooksTable",
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
    userIdIndex: index("idx_user_id_like").on(table.userId),
    bookIdIndex: index("idx_book_id_like").on(table.bookId),
    uniqueUserIdAndBookId: uniqueIndex("unique_user_id_and_book_id_like").on(
      table.userId,
      table.bookId
    ),
  })
);

export const userLikedBooksRelations = relations(
  userLikedBooksTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [userLikedBooksTable.userId],
      references: [UserTable.id],
    }),
    book: one(BookTable, {
      fields: [userLikedBooksTable.bookId],
      references: [BookTable.id],
    }),
  })
);

export default userLikedBooksTable;
