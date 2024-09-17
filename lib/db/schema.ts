import { pgTable, uuid,varchar } from "drizzle-orm/pg-core"


export const UserTable = pgTable('UserTable',
    {
        id:uuid('id').defaultRandom(),
        name:varchar('name').notNull(),
        email:varchar('email').notNull(),
    }
)
export const ProductTable = pgTable('ProductTable',
    {
        id:uuid('id').defaultRandom(),
        name:varchar('name').notNull(),
    }
)