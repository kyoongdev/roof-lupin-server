/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Announcement` table. All the data in the column will be lost.
  - You are about to alter the column `dueDate` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `deletedAt` on the `Curation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Announcement` DROP COLUMN `deletedAt`;

-- AlterTable
ALTER TABLE `Coupon` MODIFY `dueDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Curation` DROP COLUMN `deletedAt`;

-- CreateTable
CREATE TABLE `SearchRecord` (
    `id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SearchRecommend` (
    `id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SearchRecord` ADD CONSTRAINT `SearchRecord_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
