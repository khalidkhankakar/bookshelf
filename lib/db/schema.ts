import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  pgEnum,
  pgTable,
  real,
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
  price: real("price").default(0),
  category: varchar("category").notNull(),
  rating: real("rating"),
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
    twitterUrl:varchar('twitterUrl'),
    instagramUrl:varchar('instagramUrl'),
    bio:varchar('bio'),
    location:varchar('location'),
    coverImage:varchar('coverImage'),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex("email_idx").on(table.email),
  })
);


// TODO: Refactor this Schema, Something is wrong here
export const UserBooksTable= pgTable("UserBooksTable", {
  userId: uuid('userId').references(() => UserTable.id).notNull(),
  bookId:uuid('bookId').references(() => BookTable.id).notNull(),
})


export const userSavedBooksTable = pgTable('UserSavedBooksTable',{
  id: uuid('id').defaultRandom(),
  userId:uuid('userId').references(() => UserTable.id).notNull(),
  bookId:uuid('bookId').references(() => BookTable.id).notNull(),
},(table)=>({
  userIdIndex: index('idx_user_id_save').on(table.userId),
  bookIdIndex: index('idx_book_id_save').on(table.bookId),
  uniqueUserIdAndBookId: uniqueIndex('unique_user_id_and_book_id_save').on(table.userId,table.bookId)
}))



export const userLikedBooksTable = pgTable('UserLikedBooksTable',{
  id: uuid('id').defaultRandom(),
  userId:uuid('userId').references(() => UserTable.id).notNull(),
  bookId:uuid('bookId').references(() => BookTable.id).notNull(),
},(table)=>({
  userIdIndex: index('idx_user_id_like').on(table.userId),
  bookIdIndex: index('idx_book_id_like').on(table.bookId),
  uniqueUserIdAndBookId: uniqueIndex('unique_user_id_and_book_id_like').on(table.userId,table.bookId)
}))


export const userHaveToReadBooksTable = pgTable('UserHaveToReadBooksTable',{
  id: uuid('id').defaultRandom(),
  userId:uuid('userId').references(() => UserTable.id).notNull(),
  bookId:uuid('bookId').references(() => BookTable.id).notNull(),
},(table)=>({
  userIdIndex: index('idx_user_id_have_to_read').on(table.userId),
  bookIdIndex: index('idx_book_id_have_to_read').on(table.bookId),
  uniqueUserIdAndBookId: uniqueIndex('unique_user_id_and_book_id_have_to_read').on(table.userId,table.bookId)
}))

export const userCurrentlyReadingBooksTable = pgTable('userCurrentlyReadingBooksTable',{
  id: uuid('id').defaultRandom(),
  userId:uuid('userId').references(() => UserTable.id).notNull(),
  bookId:uuid('bookId').references(() => BookTable.id).notNull(),
},(table)=>({
  userIdIndex: index('idx_user_id_currently_reading').on(table.userId),
  bookIdIndex: index('idx_book_id_currently_reading').on(table.bookId),
  uniqueUserIdAndBookId: uniqueIndex('unique_user_id_and_book_id_currently_reading').on(table.userId,table.bookId)
}))

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
  savedBooks: many(userSavedBooksTable),
  likedBooks: many(userLikedBooksTable),
  haveToReadBooks: many(userHaveToReadBooksTable),
  currentlyReadingBooks: many(userCurrentlyReadingBooksTable),
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



export const userSavedBooksRelations = relations(userSavedBooksTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [userSavedBooksTable.userId],
    references: [UserTable.id],
  }),
  book: one(BookTable, {
    fields: [userSavedBooksTable.bookId],
    references: [BookTable.id],
  }),
}))


export const userLikedBooksRelations = relations(userLikedBooksTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [userLikedBooksTable.userId],
    references: [UserTable.id],
  }),
  book: one(BookTable, {
    fields: [userLikedBooksTable.bookId],
    references: [BookTable.id],
  }), 
}))

export const userHaveToReadBooksRelations = relations(userHaveToReadBooksTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [userHaveToReadBooksTable.userId],
    references: [UserTable.id],
  }),
  book: one(BookTable, {
    fields: [userHaveToReadBooksTable.bookId],
    references: [BookTable.id],
  }), 
}))

export const userCurrentlyReadingBooksReations = relations(userCurrentlyReadingBooksTable,({ one }) => ({
  user:one(UserTable,{
    fields:[userCurrentlyReadingBooksTable.userId],
    references:[UserTable.id]
  }),
  book:one(BookTable,{
    fields:[userCurrentlyReadingBooksTable.bookId],
    references:[BookTable.id]
  }),
}))