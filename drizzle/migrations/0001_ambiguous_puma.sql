DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('user', 'admin', 'superuser');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "role" DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "activated_account" boolean DEFAULT false;