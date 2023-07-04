/*
  Warnings:

  - You are about to alter the column `defaultDueDateStart` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `startAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dueDateStartAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dueDateEndAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Coupon` MODIFY `defaultDueDateStart` DATETIME NULL;

-- AlterTable
ALTER TABLE `Exhibition` MODIFY `startAt` DATETIME NOT NULL,
    MODIFY `endAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDateStartAt` DATETIME NOT NULL,
    MODIFY `dueDateEndAt` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `ReservedAdditionalService` (
    `reservationId` VARCHAR(191) NOT NULL,
    `additionalServiceId` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`reservationId`, `additionalServiceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReservedAdditionalService` ADD CONSTRAINT `ReservedAdditionalService_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservedAdditionalService` ADD CONSTRAINT `ReservedAdditionalService_additionalServiceId_fkey` FOREIGN KEY (`additionalServiceId`) REFERENCES `AdditionalService`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
