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
ALTER TABLE `UserCoupon` MODIFY `usageDateStartAt` DATETIME NOT NULL,
    MODIFY `usageDateEndAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `UserReport` ADD COLUMN `spaceQnAAnswerId` VARCHAR(191) NULL,
    ADD COLUMN `spaceReviewAnswerId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `HostReport` (
    `id` VARCHAR(191) NOT NULL,
    `reportStatus` TINYINT NOT NULL DEFAULT 1,
    `content` MEDIUMTEXT NOT NULL,
    `spaceReviewId` VARCHAR(191) NULL,
    `spaceQnAId` VARCHAR(191) NULL,
    `hostId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserReport` ADD CONSTRAINT `UserReport_spaceReviewAnswerId_fkey` FOREIGN KEY (`spaceReviewAnswerId`) REFERENCES `SpaceReviewAnswer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserReport` ADD CONSTRAINT `UserReport_spaceQnAAnswerId_fkey` FOREIGN KEY (`spaceQnAAnswerId`) REFERENCES `SpaceQnAAnswer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HostReport` ADD CONSTRAINT `HostReport_spaceReviewId_fkey` FOREIGN KEY (`spaceReviewId`) REFERENCES `SpaceReview`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HostReport` ADD CONSTRAINT `HostReport_spaceQnAId_fkey` FOREIGN KEY (`spaceQnAId`) REFERENCES `SpaceQnA`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HostReport` ADD CONSTRAINT `HostReport_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `Host`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
