/*
  Warnings:

  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `UserAlarm` ADD COLUMN `isPush` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isPushed` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;
