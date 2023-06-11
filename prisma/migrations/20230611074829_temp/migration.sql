/*
  Warnings:

  - You are about to drop the column `rentalTypeId` on the `TimeCostInfo` table. All the data in the column will be lost.
  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `rentalTypeI` to the `TimeCostInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `TimeCostInfo` DROP FOREIGN KEY `TimeCostInfo_rentalTypeId_fkey`;

-- AlterTable
ALTER TABLE `TimeCostInfo` DROP COLUMN `rentalTypeId`,
    ADD COLUMN `rentalTypeI` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `TimeCostInfo` ADD CONSTRAINT `TimeCostInfo_rentalTypeI_fkey` FOREIGN KEY (`rentalTypeI`) REFERENCES `RentalType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
