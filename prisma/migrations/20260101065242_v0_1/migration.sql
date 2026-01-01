/*
  Warnings:

  - Made the column `traitId` on table `Skill` required. This step will fail if there are existing NULL values in that column.
  - Made the column `personId` on table `Skill` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_personId_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_traitId_fkey";

-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "traitId" SET NOT NULL,
ALTER COLUMN "personId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_traitId_fkey" FOREIGN KEY ("traitId") REFERENCES "Trait"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
