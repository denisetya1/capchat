/*
  Warnings:

  - You are about to drop the column `mediaType` on the `AutomationTrigger` table. All the data in the column will be lost.
  - You are about to drop the column `mediaUrl` on the `AutomationTrigger` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AutomationTrigger" DROP COLUMN "mediaType",
DROP COLUMN "mediaUrl",
ADD COLUMN     "postType" TEXT,
ADD COLUMN     "postUrl" TEXT;
