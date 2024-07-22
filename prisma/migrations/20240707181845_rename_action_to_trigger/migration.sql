/*
  Warnings:

  - You are about to drop the column `automationActionTypeId` on the `AutomationsTrigger` table. All the data in the column will be lost.
  - You are about to drop the `AutomationActionType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `automationTriggerTypeId` to the `AutomationsTrigger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AutomationsTrigger" DROP CONSTRAINT "AutomationsTrigger_automationActionTypeId_fkey";

-- AlterTable
ALTER TABLE "AutomationsTrigger" DROP COLUMN "automationActionTypeId",
ADD COLUMN     "automationTriggerTypeId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "AutomationActionType";

-- CreateTable
CREATE TABLE "AutomationTriggerType" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AutomationTriggerType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AutomationsTrigger" ADD CONSTRAINT "AutomationsTrigger_automationTriggerTypeId_fkey" FOREIGN KEY ("automationTriggerTypeId") REFERENCES "AutomationTriggerType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
