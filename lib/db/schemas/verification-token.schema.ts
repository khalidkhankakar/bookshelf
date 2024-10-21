import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import  UserTable  from "./user.schema";
import { relations } from "drizzle-orm";

const VerificationTokenTable = pgTable("VerificationTokenTable", {
    id: uuid("id").defaultRandom().unique(),
    userId: uuid("userId")
      .references(() => UserTable.id)
      .unique() // Foreign key to UserTable.id
      .notNull(),
    token: varchar("token"),
    expires: timestamp("expires"),
  });

  export const verificationTokenTableRelations = relations(
    VerificationTokenTable,
    ({ one }) => ({
      user: one(UserTable, {
        fields: [VerificationTokenTable.userId],
        references: [UserTable.id],
      }),
    })
  );

  export default VerificationTokenTable;