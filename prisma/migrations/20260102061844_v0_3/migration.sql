-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "roles" TEXT[] DEFAULT ARRAY['USER']::TEXT[];
