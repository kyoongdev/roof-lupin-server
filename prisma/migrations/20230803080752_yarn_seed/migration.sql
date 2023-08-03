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

-- CreateTable
CREATE TABLE `AlarmSpace` (
    `userAlarmId` VARCHAR(191) NOT NULL,
    `spaceId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AlarmSpace_userAlarmId_key`(`userAlarmId`),
    PRIMARY KEY (`userAlarmId`, `spaceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlarmExhibition` (
    `userAlarmId` VARCHAR(191) NOT NULL,
    `exhibitionId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AlarmExhibition_userAlarmId_key`(`userAlarmId`),
    PRIMARY KEY (`userAlarmId`, `exhibitionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AlarmSpace` ADD CONSTRAINT `AlarmSpace_userAlarmId_fkey` FOREIGN KEY (`userAlarmId`) REFERENCES `UserAlarm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlarmSpace` ADD CONSTRAINT `AlarmSpace_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlarmExhibition` ADD CONSTRAINT `AlarmExhibition_userAlarmId_fkey` FOREIGN KEY (`userAlarmId`) REFERENCES `UserAlarm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlarmExhibition` ADD CONSTRAINT `AlarmExhibition_exhibitionId_fkey` FOREIGN KEY (`exhibitionId`) REFERENCES `Exhibition`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
