CREATE TABLE IF NOT EXISTS "UserBooksTable" (
	"userId" uuid NOT NULL,
	"bookId" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserBooksTable" ADD CONSTRAINT "UserBooksTable_userId_UserTable_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."UserTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserBooksTable" ADD CONSTRAINT "UserBooksTable_bookId_BookTable_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."BookTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "UserTable" DROP COLUMN IF EXISTS "userBooks";