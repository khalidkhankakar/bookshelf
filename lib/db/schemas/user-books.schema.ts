import { pgTable, uuid } from "drizzle-orm/pg-core";
import UserTable from "./user.schema";
import BookTable from "./book.schema";
import { relations } from "drizzle-orm";

const UserBooksTable = pgTable("UserBooksTable", {
  userId: uuid("userId")
    .references(() => UserTable.id)
    .notNull(),
  bookId: uuid("bookId")
    .references(() => BookTable.id)
    .notNull(),
});

export const userBooksTableRelations = relations(UserBooksTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [UserBooksTable.userId],
    references: [UserTable.id],
  }),
  book: one(BookTable, {
    fields: [UserBooksTable.bookId],
    references: [BookTable.id],
  }),
}));

export default UserBooksTable;
