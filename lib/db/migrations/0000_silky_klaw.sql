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
	"category" varchar NOT NULL,
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
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "UserTable" USING btree ("email");