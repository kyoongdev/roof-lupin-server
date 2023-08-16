/*
  Warnings:

  - You are about to alter the column `defaultDueDateStart` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `startAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `usageDateStartAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `usageDateEndAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `SpaceReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SpaceReportAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SpaceReviewReport` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `SpaceReport` DROP FOREIGN KEY `SpaceReport_spaceId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceReport` DROP FOREIGN KEY `SpaceReport_userId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceReportAnswer` DROP FOREIGN KEY `SpaceReportAnswer_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceReportAnswer` DROP FOREIGN KEY `SpaceReportAnswer_spaceReportId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceReviewReport` DROP FOREIGN KEY `SpaceReviewReport_spaceReviewId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceReviewReport` DROP FOREIGN KEY `SpaceReviewReport_userId_fkey`;

-- AlterTable
ALTER TABLE `Coupon` MODIFY `defaultDueDateStart` DATETIME NULL;

-- AlterTable
ALTER TABLE `Exhibition` MODIFY `startAt` DATETIME NOT NULL,
    MODIFY `endAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `usageDateStartAt` DATETIME NOT NULL,
    MODIFY `usageDateEndAt` DATETIME NOT NULL;

-- DropTable
DROP TABLE `SpaceReport`;

-- DropTable
DROP TABLE `SpaceReportAnswer`;

-- DropTable
DROP TABLE `SpaceReviewReport`;

-- CreateTable
CREATE TABLE `UserReport` (
    `id` VARCHAR(191) NOT NULL,
    `reportType` TINYINT NOT NULL,
    `reportStatus` TINYINT NOT NULL DEFAULT 1,
    `content` MEDIUMTEXT NOT NULL,
    `spaceId` VARCHAR(191) NULL,
    `spaceReviewId` VARCHAR(191) NULL,
    `spaceQnAId` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserReportAnswer` (
    `id` VARCHAR(191) NOT NULL,
    `content` MEDIUMTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `adminId` VARCHAR(191) NOT NULL,
    `reportId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserReportAnswer_reportId_key`(`reportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserReport` ADD CONSTRAINT `UserReport_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserReport` ADD CONSTRAINT `UserReport_spaceReviewId_fkey` FOREIGN KEY (`spaceReviewId`) REFERENCES `SpaceReview`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserReport` ADD CONSTRAINT `UserReport_spaceQnAId_fkey` FOREIGN KEY (`spaceQnAId`) REFERENCES `SpaceQnA`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserReport` ADD CONSTRAINT `UserReport_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserReportAnswer` ADD CONSTRAINT `UserReportAnswer_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserReportAnswer` ADD CONSTRAINT `UserReportAnswer_reportId_fkey` FOREIGN KEY (`reportId`) REFERENCES `UserReport`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
