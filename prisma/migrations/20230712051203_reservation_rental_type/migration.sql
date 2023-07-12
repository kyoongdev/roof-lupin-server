/*
  Warnings:

  - You are about to alter the column `defaultDueDateStart` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `startAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `endAt` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `startAt` on the `Reservation` table. All the data in the column will be lost.
  - You are about to alter the column `usageDateStartAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `usageDateEndAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_rentalTypeId_fkey`;

-- AlterTable
ALTER TABLE `Coupon` MODIFY `defaultDueDateStart` DATETIME NULL;

-- AlterTable
ALTER TABLE `Exhibition` MODIFY `startAt` DATETIME NOT NULL,
    MODIFY `endAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `endAt`,
    DROP COLUMN `startAt`,
    MODIFY `rentalTypeId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `usageDateStartAt` DATETIME NOT NULL,
    MODIFY `usageDateEndAt` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `ReservationRentalType` (
    `reservationId` VARCHAR(191) NOT NULL,
    `rentalTypeId` VARCHAR(191) NOT NULL,
    `startAt` INTEGER NOT NULL,
    `endAt` INTEGER NOT NULL,

    PRIMARY KEY (`reservationId`, `rentalTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReservationRentalType` ADD CONSTRAINT `ReservationRentalType_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationRentalType` ADD CONSTRAINT `ReservationRentalType_rentalTypeId_fkey` FOREIGN KEY (`rentalTypeId`) REFERENCES `RentalType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_rentalTypeId_fkey` FOREIGN KEY (`rentalTypeId`) REFERENCES `RentalType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
