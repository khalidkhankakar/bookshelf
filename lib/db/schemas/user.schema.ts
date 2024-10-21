import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgEnum,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import BookTable from "./book.schema";
import UserBooksTable from "./user-books.schema";
import VerificationTokenTable from "./verification-token.schema";
import userSavedBooksTable from "./user-saved-books.schema";
import userLikedBooksTable from "./user-liked-books.schema";
import userHaveToReadBooksTable from "./user-have-to-read-books.schema";
import userCurrentlyReadingBooksTable from "./user-currently-reading-books.schema";

export const providerEnum = pgEnum("provider", [
  "credentials",
  "google",
  "github",
]);

const UserTable = pgTable(
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

export default UserTable;
