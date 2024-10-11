DO $$ BEGIN
 CREATE TYPE "public"."provider" AS ENUM('credentials', 'google', 'github');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "BookTable" (
	"id" uuid DEFAULT gen_random_uuid(),
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"userId" uuid NOT NULL,
	"author" varchar NOT NULL,
	"image" varchar NOT NULL,
	"bookPdf" varchar NOT NULL,
	"isFree" boolean DEFAULT false,
	"price" real DEFAULT 0,
	"rating" real,
	"publisher" varchar NOT NULL,
	"publishedAt" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "BookTable_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserBooksTable" (
	"userId" uuid NOT NULL,
	"bookId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserTable" (
	"id" uuid DEFAULT gen_random_uuid(),
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"image" varchar,
	"password" varchar,
	"provider" "provider" NOT NULL,
	"emailVerified" boolean DEFAULT false,
	"twitterUrl" varchar,
	"instagramUrl" varchar,
	"bio" varchar,
	"location" varchar,
	"coverImage" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "UserTable_id_unique" UNIQUE("id"),
	CONSTRAINT "UserTable_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VerificationTokenTable" (
	"id" uuid DEFAULT gen_random_uuid(),
	"userId" uuid NOT NULL,
	"token" varchar,
	"expires" timestamp,
	CONSTRAINT "VerificationTokenTable_id_unique" UNIQUE("id"),
	CONSTRAINT "VerificationTokenTable_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "BookCategoryMappingTable" (
	"bookId" uuid NOT NULL,
	"categoryId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "BookCategoryTable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "BookCategoryTable_id_unique" UNIQUE("id")
);
--> statement-breakpoint
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
 ALTER TABLE "BookTable" ADD CONSTRAINT "BookTable_userId_UserTable_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."UserTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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
DO $$ BEGIN
 ALTER TABLE "VerificationTokenTable" ADD CONSTRAINT "VerificationTokenTable_userId_UserTable_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."UserTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "BookCategoryMappingTable" ADD CONSTRAINT "BookCategoryMappingTable_bookId_BookTable_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."BookTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "BookCategoryMappingTable" ADD CONSTRAINT "BookCategoryMappingTable_categoryId_BookCategoryTable_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."BookCategoryTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "UserTable" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_book_id" ON "BookCategoryMappingTable" USING btree ("bookId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_category_id" ON "BookCategoryMappingTable" USING btree ("categoryId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_category_name" ON "BookCategoryTable" USING btree ("name");--> statement-breakpoint
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