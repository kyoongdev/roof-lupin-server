/*
  Warnings:

  - You are about to alter the column `defaultDueDateStart` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `startAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `iconId` on the `Service` table. All the data in the column will be lost.
  - You are about to alter the column `usageDateStartAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `usageDateEndAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `Service` DROP FOREIGN KEY `Service_iconId_fkey`;

-- AlterTable
ALTER TABLE `Coupon` MODIFY `defaultDueDateStart` DATETIME NULL;

-- AlterTable
ALTER TABLE `Exhibition` MODIFY `startAt` DATETIME NOT NULL,
    MODIFY `endAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Service` DROP COLUMN `iconId`;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `usageDateStartAt` DATETIME NOT NULL,
    MODIFY `usageDateEndAt` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `ServiceIcon` (
    `serviceId` VARCHAR(191) NOT NULL,
    `iconId` VARCHAR(191) NOT NULL,
    `isSelected` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`serviceId`, `iconId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ServiceIcon` ADD CONSTRAINT `ServiceIcon_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceIcon` ADD CONSTRAINT `ServiceIcon_iconId_fkey` FOREIGN KEY (`iconId`) REFERENCES `Icon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
