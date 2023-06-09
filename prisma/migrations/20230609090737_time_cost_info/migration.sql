/*
  Warnings:

  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;

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

-- AddForeignKey
ALTER TABLE `TimeCostInfo` ADD CONSTRAINT `TimeCostInfo_rentalTypeId_fkey` FOREIGN KEY (`rentalTypeId`) REFERENCES `RentalType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
