/*
  Warnings:

  - You are about to alter the column `dueDate` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `HashTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SpaceHashTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `SpaceHashTag` DROP FOREIGN KEY `SpaceHashTag_hashTagId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceHashTag` DROP FOREIGN KEY `SpaceHashTag_spaceId_fkey`;

-- AlterTable
ALTER TABLE `Coupon` MODIFY `dueDate` DATETIME NOT NULL;

-- DropTable
DROP TABLE `HashTag`;

-- DropTable
DROP TABLE `SpaceHashTag`;

-- CreateTable
CREATE TABLE `SpaceHashtag` (
    `spaceId` VARCHAR(191) NOT NULL,
    `hashtagId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`spaceId`, `hashtagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hashtag` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SpaceHashtag` ADD CONSTRAINT `SpaceHashtag_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceHashtag` ADD CONSTRAINT `SpaceHashtag_hashtagId_fkey` FOREIGN KEY (`hashtagId`) REFERENCES `Hashtag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
