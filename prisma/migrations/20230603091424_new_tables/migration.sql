/*
  Warnings:

  - You are about to alter the column `dueDate` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `LoginBackground` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[lat,lng]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `thumbnail` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `LoginBackground` DROP FOREIGN KEY `LoginBackground_imageId_fkey`;

-- AlterTable
ALTER TABLE `Coupon` MODIFY `dueDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Space` ADD COLUMN `thumbnail` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `isAdult` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `LoginBackground`;

-- CreateTable
CREATE TABLE `AppInfo` (
    `id` VARCHAR(191) NOT NULL,
    `iosVersion` VARCHAR(20) NOT NULL,
    `androidVersion` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FAQ` (
    `id` VARCHAR(191) NOT NULL,
    `question` VARCHAR(120) NOT NULL,
    `answer` MEDIUMTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Announcement` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(120) NOT NULL,
    `content` MEDIUMTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curation` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(30) NOT NULL,
    `subTitle` VARCHAR(100) NOT NULL,
    `content` MEDIUMTEXT NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Location_lat_lng_key` ON `Location`(`lat`, `lng`);

-- AddForeignKey
ALTER TABLE `Curation` ADD CONSTRAINT `Curation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
