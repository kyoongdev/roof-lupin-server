/*
  Warnings:

  - You are about to alter the column `name` on the `Admin` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `dueDate` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `userId` on the `Host` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Host` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to drop the column `cost` on the `RentalType` table. All the data in the column will be lost.
  - You are about to drop the column `costType` on the `RentalType` table. All the data in the column will be lost.
  - You are about to drop the column `facilityIntroduction` on the `Space` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(120)` to `VarChar(20)`.
  - A unique constraint covering the columns `[email]` on the table `Host` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Host` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Host` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `Host` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baseCost` to the `RentalType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentalType` to the `RentalType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minHour` to the `Space` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overflowUserCount` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Admin` MODIFY `name` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `Coupon` MODIFY `dueDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Host` DROP COLUMN `userId`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `salt` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `RentalType` DROP COLUMN `cost`,
    DROP COLUMN `costType`,
    ADD COLUMN `baseCost` MEDIUMINT NOT NULL,
    ADD COLUMN `rentalType` TINYINT NOT NULL;

-- AlterTable
ALTER TABLE `Space` DROP COLUMN `facilityIntroduction`,
    ADD COLUMN `minHour` TINYINT NOT NULL,
    ADD COLUMN `overflowUserCount` TINYINT NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `name` VARCHAR(20) NULL;

-- CreateTable
CREATE TABLE `TimeCostInfo` (
    `id` VARCHAR(191) NOT NULL,
    `cost` MEDIUMINT NOT NULL,
    `startAt` TINYINT NOT NULL,
    `endAt` TINYINT NOT NULL,
    `rentalTypeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TimeCostInfo_rentalTypeId_key`(`rentalTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation` (
    `id` VARCHAR(191) NOT NULL,
    `year` CHAR(4) NOT NULL,
    `month` VARCHAR(2) NOT NULL,
    `day` VARCHAR(2) NOT NULL,
    `startAt` TINYINT NOT NULL,
    `endAt` TINYINT NOT NULL,
    `cost` MEDIUMINT NOT NULL,
    `rentalTypeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Reservation_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HostAccount` (
    `id` VARCHAR(191) NOT NULL,
    `ownerName` VARCHAR(20) NOT NULL,
    `bankName` TINYINT NOT NULL,
    `businessRegistrationNumber` CHAR(10) NOT NULL,
    `account` VARCHAR(40) NOT NULL,
    `accountOwner` VARCHAR(20) NOT NULL,
    `hostId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `HostAccount_hostId_key`(`hostId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Host_email_key` ON `Host`(`email`);

-- AddForeignKey
ALTER TABLE `TimeCostInfo` ADD CONSTRAINT `TimeCostInfo_rentalTypeId_fkey` FOREIGN KEY (`rentalTypeId`) REFERENCES `RentalType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_rentalTypeId_fkey` FOREIGN KEY (`rentalTypeId`) REFERENCES `RentalType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HostAccount` ADD CONSTRAINT `HostAccount_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `Host`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
