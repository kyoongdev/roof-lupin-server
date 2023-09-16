/*
  Warnings:

  - You are about to alter the column `defaultDueDateStart` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `startAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `usageDateStartAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `usageDateEndAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `AlarmExhibition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AlarmSpace` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `AlarmExhibition` DROP FOREIGN KEY `AlarmExhibition_exhibitionId_fkey`;

-- DropForeignKey
ALTER TABLE `AlarmExhibition` DROP FOREIGN KEY `AlarmExhibition_userAlarmId_fkey`;

-- DropForeignKey
ALTER TABLE `AlarmSpace` DROP FOREIGN KEY `AlarmSpace_spaceId_fkey`;

-- DropForeignKey
ALTER TABLE `AlarmSpace` DROP FOREIGN KEY `AlarmSpace_userAlarmId_fkey`;

-- AlterTable
ALTER TABLE `Coupon` MODIFY `defaultDueDateStart` DATETIME NULL;

-- AlterTable
ALTER TABLE `Exhibition` MODIFY `startAt` DATETIME NOT NULL,
    MODIFY `endAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `usageDateStartAt` DATETIME NOT NULL,
    MODIFY `usageDateEndAt` DATETIME NOT NULL;

-- DropTable
DROP TABLE `AlarmExhibition`;

-- DropTable
DROP TABLE `AlarmSpace`;
