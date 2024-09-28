import { relations } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// Enum for provider
export const providerEnum = pgEnum("provider", [
  "credentials",
  "google",
  "github",
]);

export const BookTable = pgTable("BookTable", {
  id: uuid("id").defaultRandom().unique(), // Set id as primary key
  title: varchar("title").notNull(),
  description: varchar("description").notNull(),
  userId: uuid("userId").references(() => UserTable.id).notNull(),
  author: varchar("author").notNull(),
  image: varchar("image").notNull(),
  bookPdf:varchar('bookPdf').notNull(),
  isFree: boolean("isFree").default(false),
  price: varchar("price").notNull(),
  category: varchar("category").notNull(),
  rating: varchar("rating"),
  publisher: varchar("publisher").notNull(),
  publishedAt: timestamp("publishedAt").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// UserTable schema with id as the primary key
export const UserTable = pgTable(
  "UserTable",
  {
    id: uuid("id").defaultRandom().unique(), 
    name: varchar("name").notNull(),
    email: varchar("email").unique().notNull(),
    image: varchar("image"),
    password: varchar("password"),
    provider: providerEnum("provider").notNull(),
    emailVerified: boolean("emailVerified").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex("email_idx").on(table.email),
  })
);

export const UserBooksTable= pgTable("UserBooksTable", {
  userId: uuid('userId').references(() => UserTable.id).notNull(),
  bookId:uuid('bookId').references(() => BookTable.id).notNull(),
})



// VerificationTokenTable schema
export const VerificationTokenTable = pgTable("VerificationTokenTable", {
  id: uuid("id").defaultRandom().unique(),
  userId: uuid("userId")
    .references(() => UserTable.id).unique() // Foreign key to UserTable.id
    .notNull(),
  token: varchar("token"),
  expires: timestamp("expires"),
});





// RELATIONS

export const userTableRelations = relations(UserTable, ({one, many }) => ({
  books: many(BookTable),
  userBooks: many(UserBooksTable),
  verificationToken: one(VerificationTokenTable, {
    fields: [UserTable.id],
    references: [VerificationTokenTable.userId],
  }),
}))

export const bookTableRelations = relations(BookTable, ({ one, many }) => ({
  userBooks: many(UserBooksTable),
  user: one(UserTable, {
    fields: [BookTable.userId],
    references: [UserTable.id],
  }),
}))


export const userBooksTableRelations = relations(UserBooksTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [UserBooksTable.userId],
    references: [UserTable.id],
  }),
  book: one(BookTable, {
    fields: [UserBooksTable.bookId],
    references: [BookTable.id],
  }),
}))

export const verificationTokenTableRelations = relations(VerificationTokenTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [VerificationTokenTable.userId],
    references: [UserTable.id],
  }),
}))