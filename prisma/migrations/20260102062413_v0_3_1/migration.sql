-- AlterTable
ALTER TABLE "Person" ALTER COLUMN "roles" SET DEFAULT ARRAY['user']::TEXT[];
