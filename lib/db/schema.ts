import { relations, sql } from "drizzle-orm";
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

export const BookTable = pgTable(
  "BookTable",
  {
    id: uuid("id").defaultRandom().unique(), // Set id as primary key
    title: varchar("title").notNull(),
    description: varchar("description").notNull(),
    userId: uuid("userId")
      .references(() => UserTable.id)
      .notNull(),
    author: varchar("author").notNull(),
    image: varchar("image").notNull(),
    bookPdf: varchar("bookPdf").notNull(),
    isFree: boolean("isFree").default(false),
    price: real("price").default(0),
    rating: real("rating"),
    publisher: varchar("publisher").notNull(),
    publishedAt: timestamp("publishedAt").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    bookTitleIndex: index("idx_book_title").on(table.title),
    bookAuthorIndex: index("idx_book_author").on(table.author),
    bookPublisherIndex: index("idx_book_publisher").on(table.publisher),
    // gin trigram Indexs for fuzzy search functionality
    bookTitleTrigramIndex: index("idx_book_title_trigram").using(
      "gin",
      sql`${table.title} gin_trgm_ops`
    ),
    bookAuthorTrigramIndex: index("idx_book_author_trigram").using(
      "gin",
      sql`${table.author} gin_trgm_ops`
    ),
    bookPublisherTrigramIndex: index("idx_book_publisher_trigram").using(
      "gin",
      sql`${table.publisher} gin_trgm_ops`
    ),
  })
);

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
    twitterUrl: varchar("twitterUrl"),
    instagramUrl: varchar("instagramUrl"),
    bio: varchar("bio"),
    location: varchar("location"),
    coverImage: varchar("coverImage"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex("email_idx").on(table.email),
    nameIdx: index("name_idx").on(table.name),
    // gin trigram Indexs for fuzzy search functionality
    nameTrigramIndex: index("idx_name_trigram").using(
      "gin",
      sql`${table.name} gin_trgm_ops`
    ),
  })
);

// TODO: Refactor this Schema, Something is wrong here
export const UserBooksTable = pgTable("UserBooksTable", {
  userId: uuid("userId")
    .references(() => UserTable.id)
    .notNull(),
  bookId: uuid("bookId")
    .references(() => BookTable.id)
    .notNull(),
});

export const bookCategoryTable = pgTable(
  "BookCategoryTable",
  {
    id: uuid("id").defaultRandom().unique().primaryKey(),
    name: varchar("name").notNull(),
  },
  (table) => ({
    nameIndex: index("idx_category_name").on(table.name),
    // gin trigram Indexs for fuzzy search functionality
    nameTrigramIndex: index("idx_category_name_trigram").using(
      "gin",
      sql`${table.name} gin_trgm_ops`
    ),
  })
);

export const bookCategoryMappingTable = pgTable(
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

export const userSavedBooksTable = pgTable(
  "UserSavedBooksTable",
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
    userIdIndex: index("idx_user_id_save").on(table.userId),
    bookIdIndex: index("idx_book_id_save").on(table.bookId),
    uniqueUserIdAndBookId: uniqueIndex("unique_user_id_and_book_id_save").on(
      table.userId,
      table.bookId
    ),
  })
);

export const userLikedBooksTable = pgTable(
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

export const userHaveToReadBooksTable = pgTable(
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

export const userCurrentlyReadingBooksTable = pgTable(
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

// VerificationTokenTable schema
export const VerificationTokenTable = pgTable("VerificationTokenTable", {
  id: uuid("id").defaultRandom().unique(),
  userId: uuid("userId")
    .references(() => UserTable.id)
    .unique() // Foreign key to UserTable.id
    .notNull(),
  token: varchar("token"),
  expires: timestamp("expires"),
});

// RELATIONS

export const userTableRelations = relations(UserTable, ({ one, many }) => ({
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
}));

export const bookTableRelations = relations(BookTable, ({ one, many }) => ({
  userBooks: many(UserBooksTable),
  user: one(UserTable, {
    fields: [BookTable.userId],
    references: [UserTable.id],
  }),
  category: many(bookCategoryMappingTable),
}));

export const bookCategoryRelations = relations(
  bookCategoryTable,
  ({ many }) => ({
    books: many(bookCategoryMappingTable),
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

export const verificationTokenTableRelations = relations(
  VerificationTokenTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [VerificationTokenTable.userId],
      references: [UserTable.id],
    }),
  })
);

export const userSavedBooksRelations = relations(
  userSavedBooksTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [userSavedBooksTable.userId],
      references: [UserTable.id],
    }),
    book: one(BookTable, {
      fields: [userSavedBooksTable.bookId],
      references: [BookTable.id],
    }),
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
