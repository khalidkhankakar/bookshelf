DO $$ BEGIN
 CREATE TYPE "public"."provider" AS ENUM('credentials', 'google', 'github');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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
 ALTER TABLE "VerificationTokenTable" ADD CONSTRAINT "VerificationTokenTable_userId_UserTable_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."UserTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "UserTable" USING btree ("email");