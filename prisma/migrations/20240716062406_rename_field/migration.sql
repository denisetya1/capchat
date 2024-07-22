/*
  Warnings:

  - You are about to drop the column `isAll` on the `AutomationTrigger` table. All the data in the column will be lost.
  - You are about to drop the column `isExact` on the `AutomationTrigger` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AutomationTrigger" DROP COLUMN "isAll",
DROP COLUMN "isExact",
ADD COLUMN     "isAllComment" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isAllPost" BOOLEAN NOT NULL DEFAULT false;
