/*
  Warnings:

  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `UserCoupon` ADD COLUMN `isUsed` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `dueDate` DATETIME NOT NULL;
