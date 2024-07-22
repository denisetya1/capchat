/*
  Warnings:

  - You are about to drop the column `automationsTriggerId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the `AutomationsTrigger` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `automationTriggerId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AutomationsTrigger" DROP CONSTRAINT "AutomationsTrigger_automationId_fkey";

-- DropForeignKey
ALTER TABLE "AutomationsTrigger" DROP CONSTRAINT "AutomationsTrigger_automationTriggerTypeId_fkey";

-- DropForeignKey
ALTER TABLE "AutomationsTrigger" DROP CONSTRAINT "AutomationsTrigger_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_automationsTriggerId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "automationsTriggerId",
ADD COLUMN     "automationTriggerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "AutomationsTrigger";

-- CreateTable
CREATE TABLE "AutomationTrigger" (
    "id" TEXT NOT NULL,
    "automationId" TEXT NOT NULL,
    "automationTriggerTypeId" INTEGER NOT NULL,
    "mediaId" TEXT,
    "isAll" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "keyword" TEXT,
    "isExact" BOOLEAN NOT NULL DEFAULT true,
    "autoLike" BOOLEAN NOT NULL DEFAULT false,
    "isNoReply" BOOLEAN NOT NULL DEFAULT false,
    "replies" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "runCount" INTEGER NOT NULL DEFAULT 0,
    "ctrCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AutomationTrigger_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AutomationTrigger" ADD CONSTRAINT "AutomationTrigger_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "Automation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutomationTrigger" ADD CONSTRAINT "AutomationTrigger_automationTriggerTypeId_fkey" FOREIGN KEY ("automationTriggerTypeId") REFERENCES "AutomationTriggerType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutomationTrigger" ADD CONSTRAINT "AutomationTrigger_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_automationTriggerId_fkey" FOREIGN KEY ("automationTriggerId") REFERENCES "AutomationTrigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
