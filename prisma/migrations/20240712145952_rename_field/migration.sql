/*
  Warnings:

  - You are about to drop the column `postUrl` on the `AutomationTrigger` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AutomationTrigger" DROP COLUMN "postUrl",
ADD COLUMN     "postThumbnailUrl" TEXT;
