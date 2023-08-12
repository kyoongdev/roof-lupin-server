/*
  Warnings:

  - You are about to alter the column `defaultDueDateStart` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `startAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `usageDateStartAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `usageDateEndAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Coupon` MODIFY `defaultDueDateStart` DATETIME NULL;

-- AlterTable
ALTER TABLE `Exhibition` MODIFY `startAt` DATETIME NOT NULL,
    MODIFY `endAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `SpaceQnA` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `SpaceReview` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `usageDateStartAt` DATETIME NOT NULL,
    MODIFY `usageDateEndAt` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `History` (
    `id` VARCHAR(191) NOT NULL,
    `content` MEDIUMTEXT NOT NULL,
    `writtenAt` DATETIME(3) NOT NULL,
    `spaceReviewAnswerId` VARCHAR(191) NULL,
    `spaceQnAAnswerId` VARCHAR(191) NULL,
    `spaceQnAId` VARCHAR(191) NULL,
    `spaceReviewId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_spaceReviewAnswerId_fkey` FOREIGN KEY (`spaceReviewAnswerId`) REFERENCES `SpaceReviewAnswer`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_spaceQnAAnswerId_fkey` FOREIGN KEY (`spaceQnAAnswerId`) REFERENCES `SpaceQnAAnswer`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_spaceQnAId_fkey` FOREIGN KEY (`spaceQnAId`) REFERENCES `SpaceQnA`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_spaceReviewId_fkey` FOREIGN KEY (`spaceReviewId`) REFERENCES `SpaceReview`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;
