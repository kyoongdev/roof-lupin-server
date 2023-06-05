/*
  Warnings:

  - You are about to alter the column `dueDate` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Coupon` MODIFY `dueDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `RentalType` MODIFY `startAt` TINYINT NOT NULL DEFAULT 0,
    MODIFY `endAt` TINYINT NOT NULL DEFAULT 24;
