/*
  Warnings:

  - You are about to drop the column `cost` on the `Reservation` table. All the data in the column will be lost.
  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[orderId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderResultId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `originalCost` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `settlementId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxFreeCost` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCost` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `cost`,
    ADD COLUMN `discountCost` MEDIUMINT NOT NULL DEFAULT 0,
    ADD COLUMN `isNotForSale` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `orderId` VARCHAR(191) NULL,
    ADD COLUMN `orderResultId` VARCHAR(191) NULL,
    ADD COLUMN `originalCost` MEDIUMINT NOT NULL,
    ADD COLUMN `payMethod` TINYINT NULL,
    ADD COLUMN `payedAt` DATETIME(3) NULL,
    ADD COLUMN `settlementId` VARCHAR(191) NOT NULL,
    ADD COLUMN `taxFreeCost` MEDIUMINT NOT NULL,
    ADD COLUMN `totalCost` MEDIUMINT NOT NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `Settlement` (
    `id` VARCHAR(191) NOT NULL,
    `year` CHAR(4) NOT NULL,
    `month` VARCHAR(2) NOT NULL,
    `day` VARCHAR(2) NOT NULL,
    `totalCost` MEDIUMINT NOT NULL,
    `taxFreeCost` MEDIUMINT NOT NULL,
    `discountCost` MEDIUMINT NOT NULL DEFAULT 0,
    `originalCost` MEDIUMINT NOT NULL,
    `isPayed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaxReturn` (
    `id` VARCHAR(191) NOT NULL,
    `year` CHAR(4) NOT NULL,
    `month` VARCHAR(2) NOT NULL,
    `merchantPurchaseCost` MEDIUMINT NOT NULL,
    `merchantSalesCost` MEDIUMINT NOT NULL,
    `receiptUrl` VARCHAR(191) NULL,
    `submittedAt` DATETIME(3) NULL,
    `hostId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Reservation_orderId_key` ON `Reservation`(`orderId`);

-- CreateIndex
CREATE UNIQUE INDEX `Reservation_orderResultId_key` ON `Reservation`(`orderResultId`);

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_settlementId_fkey` FOREIGN KEY (`settlementId`) REFERENCES `Settlement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaxReturn` ADD CONSTRAINT `TaxReturn_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `Host`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
