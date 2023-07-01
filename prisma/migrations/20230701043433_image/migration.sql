/*
  Warnings:

  - You are about to alter the column `dueDateEndAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dueDateStartAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `SpaceImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SpaceReviewImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `SpaceImage` DROP FOREIGN KEY `SpaceImage_imageId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceImage` DROP FOREIGN KEY `SpaceImage_spaceId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceReviewImage` DROP FOREIGN KEY `SpaceReviewImage_imageId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceReviewImage` DROP FOREIGN KEY `SpaceReviewImage_spaceReviewId_fkey`;

-- AlterTable
ALTER TABLE `Image` ADD COLUMN `exhibitionId` VARCHAR(191) NULL,
    ADD COLUMN `spaceId` VARCHAR(191) NULL,
    ADD COLUMN `spaceReviewId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDateEndAt` DATETIME NOT NULL,
    MODIFY `dueDateStartAt` DATETIME NOT NULL;

-- DropTable
DROP TABLE `SpaceImage`;

-- DropTable
DROP TABLE `SpaceReviewImage`;

-- CreateTable
CREATE TABLE `Exhibition` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_exhibitionId_fkey` FOREIGN KEY (`exhibitionId`) REFERENCES `Exhibition`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_spaceReviewId_fkey` FOREIGN KEY (`spaceReviewId`) REFERENCES `SpaceReview`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
