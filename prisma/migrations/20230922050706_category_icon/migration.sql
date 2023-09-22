/*
  Warnings:

  - You are about to drop the column `iconId` on the `Category` table. All the data in the column will be lost.
  - You are about to alter the column `defaultDueDateStart` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `startAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `usageDateStartAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `usageDateEndAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_iconId_fkey`;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `iconId`;

-- AlterTable
ALTER TABLE `Coupon` MODIFY `defaultDueDateStart` DATETIME NULL;

-- AlterTable
ALTER TABLE `Exhibition` MODIFY `startAt` DATETIME NOT NULL,
    MODIFY `endAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `usageDateStartAt` DATETIME NOT NULL,
    MODIFY `usageDateEndAt` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `CategoryIcon` (
    `categoryId` VARCHAR(191) NOT NULL,
    `iconId` VARCHAR(191) NOT NULL,
    `isMapIcon` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`categoryId`, `iconId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CategoryIcon` ADD CONSTRAINT `CategoryIcon_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoryIcon` ADD CONSTRAINT `CategoryIcon_iconId_fkey` FOREIGN KEY (`iconId`) REFERENCES `Icon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
