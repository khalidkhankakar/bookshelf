
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

// UserTable schema with id as the primary key
export const UserTable = pgTable(
  "UserTable",
  {
    id: uuid("id").defaultRandom().unique(), // Set id as primary key
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

// VerificationTokenTable schema
export const VerificationTokenTable = pgTable("VerificationTokenTable", {
  id: uuid("id").defaultRandom().unique(),
  userId: uuid("userId")
    .references(() => UserTable.id).unique() // Foreign key to UserTable.id
    .notNull(),
  token: varchar("token"),
  expires: timestamp("expires"),
});
