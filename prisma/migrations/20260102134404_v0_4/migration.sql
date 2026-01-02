/*
  Warnings:

  - You are about to drop the `_SessionA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SessionB` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `matchId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SessionA" DROP CONSTRAINT "_SessionA_A_fkey";

-- DropForeignKey
ALTER TABLE "_SessionA" DROP CONSTRAINT "_SessionA_B_fkey";

-- DropForeignKey
ALTER TABLE "_SessionB" DROP CONSTRAINT "_SessionB_A_fkey";

-- DropForeignKey
ALTER TABLE "_SessionB" DROP CONSTRAINT "_SessionB_B_fkey";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "matchId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_SessionA";

-- DropTable
DROP TABLE "_SessionB";

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
