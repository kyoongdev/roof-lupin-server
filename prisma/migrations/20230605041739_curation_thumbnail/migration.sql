/*
  Warnings:

  - You are about to alter the column `dueDate` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `thumbnail` to the `Curation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Coupon` MODIFY `dueDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Curation` ADD COLUMN `thumbnail` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Space` ADD COLUMN `homeCategoryId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `HomeCategory` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(120) NOT NULL,
    `order` TINYINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Space` ADD CONSTRAINT `Space_homeCategoryId_fkey` FOREIGN KEY (`homeCategoryId`) REFERENCES `HomeCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
