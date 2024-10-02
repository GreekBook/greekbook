ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "universities" ALTER COLUMN "updated_at" SET DEFAULT now();