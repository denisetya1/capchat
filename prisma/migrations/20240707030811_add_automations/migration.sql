/*
  Warnings:

  - You are about to drop the column `autoDMTemplate` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `commentReplyTemplate` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `dmLinkButton` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `keyword` on the `Media` table. All the data in the column will be lost.
  - Added the required column `isFollower` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Media_instagramMediaId_keyword_key";

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "isFollower" BOOLEAN NOT NULL,
ADD COLUMN     "tags" TEXT;

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "autoDMTemplate",
DROP COLUMN "commentReplyTemplate",
DROP COLUMN "dmLinkButton",
DROP COLUMN "keyword";

-- CreateTable
CREATE TABLE "AutomationActionType" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AutomationActionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Automation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Automation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutomationsTrigger" (
    "id" TEXT NOT NULL,
    "automationId" TEXT NOT NULL,
    "automationActionTypeId" INTEGER NOT NULL,
    "mediaId" TEXT,
    "isAll" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "isExact" BOOLEAN NOT NULL DEFAULT true,
    "autoLike" BOOLEAN NOT NULL DEFAULT false,
    "isNoReply" BOOLEAN NOT NULL DEFAULT false,
    "replies" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AutomationsTrigger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutomationDM" (
    "id" TEXT NOT NULL,
    "automationId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "buttons" TEXT,
    "sequence" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AutomationDM_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Automation" ADD CONSTRAINT "Automation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutomationsTrigger" ADD CONSTRAINT "AutomationsTrigger_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "Automation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutomationsTrigger" ADD CONSTRAINT "AutomationsTrigger_automationActionTypeId_fkey" FOREIGN KEY ("automationActionTypeId") REFERENCES "AutomationActionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutomationsTrigger" ADD CONSTRAINT "AutomationsTrigger_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutomationDM" ADD CONSTRAINT "AutomationDM_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "Automation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
