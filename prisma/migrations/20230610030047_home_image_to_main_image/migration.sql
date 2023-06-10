/*
  Warnings:

  - You are about to drop the column `homeCategoryId` on the `Space` table. All the data in the column will be lost.
  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `HomeCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HomeImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Space` DROP FOREIGN KEY `Space_homeCategoryId_fkey`;

-- AlterTable
ALTER TABLE `Space` DROP COLUMN `homeCategoryId`,
    ADD COLUMN `mainCategoryId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;

-- DropTable
DROP TABLE `HomeCategory`;

-- DropTable
DROP TABLE `HomeImage`;

-- CreateTable
CREATE TABLE `MainImage` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `isDefault` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MainCategory` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(120) NOT NULL,
    `order` TINYINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Space` ADD CONSTRAINT `Space_mainCategoryId_fkey` FOREIGN KEY (`mainCategoryId`) REFERENCES `MainCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
