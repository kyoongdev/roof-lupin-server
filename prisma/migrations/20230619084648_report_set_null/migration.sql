/*
  Warnings:

  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `SpaceReviewReport` DROP FOREIGN KEY `SpaceReviewReport_spaceReviewId_fkey`;

-- AlterTable
ALTER TABLE `SpaceReviewReport` MODIFY `spaceReviewId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `SpaceReviewReport` ADD CONSTRAINT `SpaceReviewReport_spaceReviewId_fkey` FOREIGN KEY (`spaceReviewId`) REFERENCES `SpaceReview`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;
