/*
  Warnings:

  - You are about to alter the column `defaultDueDateStart` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `startAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `usageDateStartAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `usageDateEndAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[spaceId]` on the table `SpaceHoliday` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `spaceId` to the `SpaceHoliday` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Coupon` MODIFY `defaultDueDateStart` DATETIME NULL;

-- AlterTable
ALTER TABLE `Exhibition` MODIFY `startAt` DATETIME NOT NULL,
    MODIFY `endAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `SpaceHoliday` ADD COLUMN `spaceId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `usageDateStartAt` DATETIME NOT NULL,
    MODIFY `usageDateEndAt` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `SpaceHoliday_spaceId_key` ON `SpaceHoliday`(`spaceId`);

-- AddForeignKey
ALTER TABLE `SpaceHoliday` ADD CONSTRAINT `SpaceHoliday_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
