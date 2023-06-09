/*
  Warnings:

  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `TimeCostInfo` DROP FOREIGN KEY `TimeCostInfo_rentalTypeId_fkey`;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `TimeCostInfo` ADD CONSTRAINT `TimeCostInfo_rentalTypeId_fkey` FOREIGN KEY (`rentalTypeId`) REFERENCES `RentalType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
