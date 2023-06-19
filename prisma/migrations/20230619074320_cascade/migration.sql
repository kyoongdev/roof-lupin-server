/*
  Warnings:

  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `SpaceSize` DROP FOREIGN KEY `SpaceSize_spaceId_fkey`;

-- DropForeignKey
ALTER TABLE `TaxReturn` DROP FOREIGN KEY `TaxReturn_hostId_fkey`;

-- DropForeignKey
ALTER TABLE `UserCoupon` DROP FOREIGN KEY `UserCoupon_couponId_fkey`;

-- DropForeignKey
ALTER TABLE `UserCoupon` DROP FOREIGN KEY `UserCoupon_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserLocation` DROP FOREIGN KEY `UserLocation_locationId_fkey`;

-- DropForeignKey
ALTER TABLE `UserLocation` DROP FOREIGN KEY `UserLocation_userId_fkey`;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `SpaceSize` ADD CONSTRAINT `SpaceSize_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaxReturn` ADD CONSTRAINT `TaxReturn_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `Host`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLocation` ADD CONSTRAINT `UserLocation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLocation` ADD CONSTRAINT `UserLocation_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCoupon` ADD CONSTRAINT `UserCoupon_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCoupon` ADD CONSTRAINT `UserCoupon_couponId_fkey` FOREIGN KEY (`couponId`) REFERENCES `Coupon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
