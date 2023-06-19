/*
  Warnings:

  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `SpaceReviewReport` (
    `spaceReviewId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`spaceReviewId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SpaceReviewReport` ADD CONSTRAINT `SpaceReviewReport_spaceReviewId_fkey` FOREIGN KEY (`spaceReviewId`) REFERENCES `SpaceReview`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceReviewReport` ADD CONSTRAINT `SpaceReviewReport_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
