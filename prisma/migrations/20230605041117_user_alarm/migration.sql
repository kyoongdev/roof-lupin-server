/*
  Warnings:

  - You are about to alter the column `dueDate` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `SpaceDiscountInfo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `minCost` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `SpaceDiscountInfo` DROP FOREIGN KEY `SpaceDiscountInfo_spaceId_fkey`;

-- AlterTable
ALTER TABLE `Category` ADD COLUMN `isHome` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Coupon` MODIFY `dueDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Space` ADD COLUMN `minCost` MEDIUMINT NOT NULL,
    MODIFY `spaceType` TINYINT NULL,
    MODIFY `buildingType` TINYINT NULL;

-- DropTable
DROP TABLE `SpaceDiscountInfo`;

-- CreateTable
CREATE TABLE `UserAlarm` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NULL,
    `alarmType` TINYINT NOT NULL,
    `alarmAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserAlarm` ADD CONSTRAINT `UserAlarm_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
