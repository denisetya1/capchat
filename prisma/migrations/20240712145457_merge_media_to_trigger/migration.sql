/*
  Warnings:

  - You are about to drop the column `mediaId` on the `AutomationTrigger` table. All the data in the column will be lost.
  - You are about to drop the column `mediaId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AutomationTrigger" DROP CONSTRAINT "AutomationTrigger_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_instagramId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_instagramId_fkey";

-- AlterTable
ALTER TABLE "AutomationTrigger" DROP COLUMN "mediaId",
ADD COLUMN     "caption" TEXT,
ADD COLUMN     "instagramId" TEXT,
ADD COLUMN     "mediaType" TEXT,
ADD COLUMN     "mediaUrl" TEXT,
ADD COLUMN     "permalink" TEXT,
ADD COLUMN     "postId" TEXT,
ADD COLUMN     "postTimestamp" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "mediaId",
ADD COLUMN     "postId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Media";

-- AddForeignKey
ALTER TABLE "AutomationTrigger" ADD CONSTRAINT "AutomationTrigger_instagramId_fkey" FOREIGN KEY ("instagramId") REFERENCES "Instagram"("id") ON DELETE SET NULL ON UPDATE CASCADE;
