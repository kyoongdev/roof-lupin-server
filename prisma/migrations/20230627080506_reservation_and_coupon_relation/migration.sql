/*
  Warnings:

  - You are about to drop the column `userCounponId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_userCounponId_fkey`;

-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `userCounponId`;

-- AlterTable
ALTER TABLE `UserCoupon` ADD COLUMN `reservationId` VARCHAR(191) NULL,
    MODIFY `dueDate` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `UserCoupon` ADD CONSTRAINT `UserCoupon_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
