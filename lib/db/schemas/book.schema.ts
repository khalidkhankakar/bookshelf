import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgEnum,
  pgTable,
  real,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import UserTable from "./user.schema";
import UserBooksTable from "./user-books.schema";
import bookCategoryMappingTable from "./book-category-mapping.schema";
import authorBookMappingTable from "./author-book-mapping.schema";

export const bookFromEnum = pgEnum("bookFrom", ["API", "DATABASE"]);

const BookTable = pgTable(
  "BookTable",
  {
    id: uuid("id").defaultRandom().unique(), // Set id as primary key
    title: varchar("title").notNull(),
    description: varchar("description").notNull(),
    userId: uuid("userId")
      .references(() => UserTable.id)
      .notNull(),
    image: varchar("image").notNull(),
    bookPdf: varchar("bookPdf").notNull(),
    isFree: boolean("isFree").default(false),
    bookFrom: bookFromEnum("bookFrom").notNull().default("DATABASE"),
    price: real("price").default(0),
    rating: real("rating"),
    publisher: varchar("publisher").notNull(),
    publishedAt: timestamp("publishedAt").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    bookTitleIndex: index("idx_book_title").on(table.title),
    bookPublisherIndex: index("idx_book_publisher").on(table.publisher),
    bookFromIndex: index("idx_book_from").on(table.bookFrom),
    // gin trigram Indexs for fuzzy search functionality
    bookTitleTrigramIndex: index("idx_book_title_trigram").using(
      "gin",
      sql`${table.title} gin_trgm_ops`
    ),
    bookPublisherTrigramIndex: index("idx_book_publisher_trigram").using(
      "gin",
      sql`${table.publisher} gin_trgm_ops`
    ),
  })
);

export const bookTableRelations = relations(BookTable, ({ one, many }) => ({
  userBooks: many(UserBooksTable),
  user: one(UserTable, {
    fields: [BookTable.userId],
    references: [UserTable.id],
  }),
  category: many(bookCategoryMappingTable),
  author: many(authorBookMappingTable),
}));

export default BookTable;
