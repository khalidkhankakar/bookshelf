import { relations, sql } from "drizzle-orm";
import { index, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import bookCategoryMappingTable from "./book-category-mapping.schema";

const bookCategoryTable = pgTable(
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

export const bookCategoryRelations = relations(
  bookCategoryTable,
  ({ many }) => ({
    books: many(bookCategoryMappingTable),
  })
);

export default bookCategoryTable;
