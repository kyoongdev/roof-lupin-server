/*
  Warnings:

  - You are about to drop the column `orderNo` on the `Category` table. All the data in the column will be lost.
  - You are about to alter the column `defaultDueDateStart` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `startAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `usageDateStartAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `usageDateEndAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Category` DROP COLUMN `orderNo`;

-- AlterTable
ALTER TABLE `Coupon` MODIFY `defaultDueDateStart` DATETIME NULL;

-- AlterTable
ALTER TABLE `Exhibition` MODIFY `startAt` DATETIME NOT NULL,
    MODIFY `endAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `SpaceCategory` ADD COLUMN `orderNo` TINYINT NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `usageDateStartAt` DATETIME NOT NULL,
    MODIFY `usageDateEndAt` DATETIME NOT NULL;
