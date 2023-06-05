/*
  Warnings:

  - You are about to alter the column `dueDate` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `SpaceUsageCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsageCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `SpaceUsageCategory` DROP FOREIGN KEY `SpaceUsageCategory_spaceId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceUsageCategory` DROP FOREIGN KEY `SpaceUsageCategory_usageCategoryId_fkey`;

-- AlterTable
ALTER TABLE `Coupon` MODIFY `dueDate` DATETIME NOT NULL;

-- DropTable
DROP TABLE `SpaceUsageCategory`;

-- DropTable
DROP TABLE `UsageCategory`;

-- CreateTable
CREATE TABLE `SpaceCategory` (
    `spaceId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`spaceId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(80) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SpaceCategory` ADD CONSTRAINT `SpaceCategory_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceCategory` ADD CONSTRAINT `SpaceCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
