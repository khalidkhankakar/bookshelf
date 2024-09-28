CREATE TABLE IF NOT EXISTS "BookTable" (
	"id" uuid DEFAULT gen_random_uuid(),
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"userId" uuid NOT NULL,
	"author" varchar NOT NULL,
	"image" varchar NOT NULL,
	"bookPdf" varchar NOT NULL,
	"publishedAt" timestamp NOT NULL,
	"isFree" boolean DEFAULT false,
	"price" varchar NOT NULL,
	"category" varchar NOT NULL,
	"rating" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "BookTable_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "UserTable" ADD COLUMN "userBooks" uuid[] DEFAULT '{}';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "BookTable" ADD CONSTRAINT "BookTable_userId_UserTable_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."UserTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
