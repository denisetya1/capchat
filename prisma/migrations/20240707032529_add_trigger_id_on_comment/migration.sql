/*
  Warnings:

  - Added the required column `automationsTriggerId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "automationsTriggerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_automationsTriggerId_fkey" FOREIGN KEY ("automationsTriggerId") REFERENCES "AutomationsTrigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
