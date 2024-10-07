CREATE TABLE IF NOT EXISTS "userCurrentlyReadingBooksTable" (
	"id" uuid DEFAULT gen_random_uuid(),
	"userId" uuid NOT NULL,
	"bookId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserHaveToReadBooksTable" (
	"id" uuid DEFAULT gen_random_uuid(),
	"userId" uuid NOT NULL,
	"bookId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserLikedBooksTable" (
	"id" uuid DEFAULT gen_random_uuid(),
	"userId" uuid NOT NULL,
	"bookId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserSavedBooksTable" (
	"id" uuid DEFAULT gen_random_uuid(),
	"userId" uuid NOT NULL,
	"bookId" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userCurrentlyReadingBooksTable" ADD CONSTRAINT "userCurrentlyReadingBooksTable_userId_UserTable_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."UserTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userCurrentlyReadingBooksTable" ADD CONSTRAINT "userCurrentlyReadingBooksTable_bookId_BookTable_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."BookTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserHaveToReadBooksTable" ADD CONSTRAINT "UserHaveToReadBooksTable_userId_UserTable_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."UserTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserHaveToReadBooksTable" ADD CONSTRAINT "UserHaveToReadBooksTable_bookId_BookTable_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."BookTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserLikedBooksTable" ADD CONSTRAINT "UserLikedBooksTable_userId_UserTable_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."UserTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserLikedBooksTable" ADD CONSTRAINT "UserLikedBooksTable_bookId_BookTable_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."BookTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserSavedBooksTable" ADD CONSTRAINT "UserSavedBooksTable_userId_UserTable_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."UserTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserSavedBooksTable" ADD CONSTRAINT "UserSavedBooksTable_bookId_BookTable_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."BookTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_user_id_currently_reading" ON "userCurrentlyReadingBooksTable" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_book_id_currently_reading" ON "userCurrentlyReadingBooksTable" USING btree ("bookId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_user_id_and_book_id_currently_reading" ON "userCurrentlyReadingBooksTable" USING btree ("userId","bookId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_user_id_have_to_read" ON "UserHaveToReadBooksTable" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_book_id_have_to_read" ON "UserHaveToReadBooksTable" USING btree ("bookId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_user_id_and_book_id_have_to_read" ON "UserHaveToReadBooksTable" USING btree ("userId","bookId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_user_id_like" ON "UserLikedBooksTable" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_book_id_like" ON "UserLikedBooksTable" USING btree ("bookId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_user_id_and_book_id_like" ON "UserLikedBooksTable" USING btree ("userId","bookId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_user_id_save" ON "UserSavedBooksTable" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_book_id_save" ON "UserSavedBooksTable" USING btree ("bookId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_user_id_and_book_id_save" ON "UserSavedBooksTable" USING btree ("userId","bookId");