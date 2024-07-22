/*
  Warnings:

  - You are about to drop the column `caption` on the `AutomationTrigger` table. All the data in the column will be lost.
  - You are about to drop the column `permalink` on the `AutomationTrigger` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AutomationTrigger" DROP COLUMN "caption",
DROP COLUMN "permalink",
ADD COLUMN     "postCaption" TEXT,
ADD COLUMN     "postPermalink" TEXT;
