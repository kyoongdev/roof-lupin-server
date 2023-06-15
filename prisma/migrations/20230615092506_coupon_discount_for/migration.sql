/*
  Warnings:

  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Coupon` ADD COLUMN `isLupinPay` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Reservation` ADD COLUMN `userCounponId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_userCounponId_fkey` FOREIGN KEY (`userCounponId`) REFERENCES `UserCoupon`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
