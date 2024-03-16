/*
  Warnings:

  - You are about to alter the column `defaultDueDateStart` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `startAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `usageDateStartAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `usageDateEndAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `ContentCategory` DROP FOREIGN KEY `ContentCategory_homeContentsId_fkey`;

-- DropForeignKey
ALTER TABLE `Exhibition` DROP FOREIGN KEY `Exhibition_homeContentsId_fkey`;

-- DropForeignKey
ALTER TABLE `Ranking` DROP FOREIGN KEY `Ranking_homeContentsId_fkey`;

-- AlterTable
ALTER TABLE `Coupon` MODIFY `defaultDueDateStart` DATETIME NULL;

-- AlterTable
ALTER TABLE `Exhibition` MODIFY `startAt` DATETIME NOT NULL,
    MODIFY `endAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `usageDateStartAt` DATETIME NOT NULL,
    MODIFY `usageDateEndAt` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `Ranking` ADD CONSTRAINT `Ranking_homeContentsId_fkey` FOREIGN KEY (`homeContentsId`) REFERENCES `HomeContents`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `ContentCategory` ADD CONSTRAINT `ContentCategory_homeContentsId_fkey` FOREIGN KEY (`homeContentsId`) REFERENCES `HomeContents`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `Exhibition` ADD CONSTRAINT `Exhibition_homeContentsId_fkey` FOREIGN KEY (`homeContentsId`) REFERENCES `HomeContents`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;
