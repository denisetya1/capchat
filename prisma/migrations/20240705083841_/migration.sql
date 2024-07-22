/*
  Warnings:

  - You are about to drop the column `userId` on the `AuthToken` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `instagramId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isBusiness` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profilePictureUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Insight` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[instagramId]` on the table `AuthToken` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[instagramMediaId,keyword]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `instagramId` to the `AuthToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromIgUserId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromUsername` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instagramMediaId` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keyword` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AuthToken" DROP CONSTRAINT "AuthToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Insight" DROP CONSTRAINT "Insight_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "Insight" DROP CONSTRAINT "Insight_userId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_userId_fkey";

-- DropIndex
DROP INDEX "AuthToken_userId_key";

-- DropIndex
DROP INDEX "Comment_instagramId_key";

-- DropIndex
DROP INDEX "Media_instagramId_key";

-- DropIndex
DROP INDEX "User_instagramId_key";

-- AlterTable
ALTER TABLE "AuthToken" DROP COLUMN "userId",
ADD COLUMN     "instagramId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "userId",
ADD COLUMN     "fromIgUserId" TEXT NOT NULL,
ADD COLUMN     "fromUsername" TEXT NOT NULL,
ADD COLUMN     "linkOpened" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "userId",
ADD COLUMN     "autoDMTemplate" TEXT,
ADD COLUMN     "commentReplyTemplate" TEXT,
ADD COLUMN     "dmLinkButton" TEXT,
ADD COLUMN     "instagramMediaId" TEXT NOT NULL,
ADD COLUMN     "keyword" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bio",
DROP COLUMN "instagramId",
DROP COLUMN "isBusiness",
DROP COLUMN "profilePictureUrl",
DROP COLUMN "username",
DROP COLUMN "website",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "Insight";

-- CreateTable
CREATE TABLE "Instagram" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "instagramId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "fullName" TEXT,
    "profilePictureUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Instagram_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Instagram_instagramId_key" ON "Instagram"("instagramId");

-- CreateIndex
CREATE UNIQUE INDEX "Instagram_userId_instagramId_key" ON "Instagram"("userId", "instagramId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthToken_instagramId_key" ON "AuthToken"("instagramId");

-- CreateIndex
CREATE UNIQUE INDEX "Media_instagramMediaId_keyword_key" ON "Media"("instagramMediaId", "keyword");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Instagram" ADD CONSTRAINT "Instagram_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_instagramId_fkey" FOREIGN KEY ("instagramId") REFERENCES "Instagram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_instagramId_fkey" FOREIGN KEY ("instagramId") REFERENCES "Instagram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthToken" ADD CONSTRAINT "AuthToken_instagramId_fkey" FOREIGN KEY ("instagramId") REFERENCES "Instagram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
