/*
  Warnings:

  - You are about to drop the `AuthToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AuthToken" DROP CONSTRAINT "AuthToken_instagramId_fkey";

-- AlterTable
ALTER TABLE "Instagram" ADD COLUMN     "authToken" TEXT,
ADD COLUMN     "expired" INTEGER,
ADD COLUMN     "longLiveToken" TEXT,
ADD COLUMN     "refreshToken" TEXT;

-- DropTable
DROP TABLE "AuthToken";
