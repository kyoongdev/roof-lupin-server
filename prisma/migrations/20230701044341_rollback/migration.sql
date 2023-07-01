/*
  Warnings:

  - You are about to drop the column `exhibitionId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `spaceId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `spaceReviewId` on the `Image` table. All the data in the column will be lost.
  - You are about to alter the column `dueDateEndAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dueDateStartAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `Exhibition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_exhibitionId_fkey`;

-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_spaceId_fkey`;

-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_spaceReviewId_fkey`;

-- AlterTable
ALTER TABLE `Image` DROP COLUMN `exhibitionId`,
    DROP COLUMN `spaceId`,
    DROP COLUMN `spaceReviewId`;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDateEndAt` DATETIME NOT NULL,
    MODIFY `dueDateStartAt` DATETIME NOT NULL;

-- DropTable
DROP TABLE `Exhibition`;

-- CreateTable
CREATE TABLE `SpaceReviewImage` (
    `spaceReviewId` VARCHAR(191) NOT NULL,
    `imageId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`spaceReviewId`, `imageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SpaceImage` (
    `spaceId` VARCHAR(191) NOT NULL,
    `imageId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`spaceId`, `imageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SpaceReviewImage` ADD CONSTRAINT `SpaceReviewImage_spaceReviewId_fkey` FOREIGN KEY (`spaceReviewId`) REFERENCES `SpaceReview`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceReviewImage` ADD CONSTRAINT `SpaceReviewImage_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceImage` ADD CONSTRAINT `SpaceImage_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceImage` ADD CONSTRAINT `SpaceImage_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
