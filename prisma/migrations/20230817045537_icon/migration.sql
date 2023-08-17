/*
  Warnings:

  - You are about to drop the column `iconPath` on the `Building` table. All the data in the column will be lost.
  - You are about to drop the column `iconPath` on the `Category` table. All the data in the column will be lost.
  - You are about to alter the column `defaultDueDateStart` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `startAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `iconPath` on the `Service` table. All the data in the column will be lost.
  - You are about to alter the column `usageDateStartAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `usageDateEndAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[iconId]` on the table `Building` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[iconId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[iconId]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `iconId` to the `Building` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Building` DROP COLUMN `iconPath`,
    ADD COLUMN `iconId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `iconPath`,
    ADD COLUMN `iconId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Coupon` MODIFY `defaultDueDateStart` DATETIME NULL;

-- AlterTable
ALTER TABLE `Exhibition` MODIFY `startAt` DATETIME NOT NULL,
    MODIFY `endAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Service` DROP COLUMN `iconPath`,
    ADD COLUMN `iconId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `usageDateStartAt` DATETIME NOT NULL,
    MODIFY `usageDateEndAt` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Building_iconId_key` ON `Building`(`iconId`);

-- CreateIndex
CREATE UNIQUE INDEX `Category_iconId_key` ON `Category`(`iconId`);

-- CreateIndex
CREATE UNIQUE INDEX `Service_iconId_key` ON `Service`(`iconId`);

-- AddForeignKey
ALTER TABLE `Building` ADD CONSTRAINT `Building_iconId_fkey` FOREIGN KEY (`iconId`) REFERENCES `Icon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_iconId_fkey` FOREIGN KEY (`iconId`) REFERENCES `Icon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_iconId_fkey` FOREIGN KEY (`iconId`) REFERENCES `Icon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
