/*
  Warnings:

  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_settlementId_fkey`;

-- AlterTable
ALTER TABLE `Reservation` MODIFY `settlementId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_settlementId_fkey` FOREIGN KEY (`settlementId`) REFERENCES `Settlement`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
