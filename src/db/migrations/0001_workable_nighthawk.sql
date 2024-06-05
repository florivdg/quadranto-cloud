ALTER TABLE "projects_users" DROP CONSTRAINT "projects_users_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_users" DROP CONSTRAINT "projects_users_project_id_projects_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "email_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "session_user_id_idx";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_users" ADD CONSTRAINT "projects_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_users" ADD CONSTRAINT "projects_users_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "id_idx" ON "profiles" USING btree (id);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "profiles" USING btree (email);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "sessions" USING btree (user_id);