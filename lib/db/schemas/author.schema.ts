import { relations, sql } from "drizzle-orm";
import { index, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import authorBookMappingTable from "./author-book-mapping.schema";

const authorTable = pgTable(
  "AuthorTable",
  {
    id: uuid("id").defaultRandom().unique().primaryKey(),
    name: varchar("name").notNull(),
  },
  (table) => ({
    nameIndex: index("idx_author_name").on(table.name),
    // gin trigram Indexs for fuzzy search functionality
    nameTrigramIndex: index("idx_author_name_trigram").using(
      "gin",
      sql`${table.name} gin_trgm_ops`
    ),
  })
);

export const authorTableRelations = relations(authorTable, ({ many }) => ({
  books: many(authorBookMappingTable),
}));

export default authorTable;
