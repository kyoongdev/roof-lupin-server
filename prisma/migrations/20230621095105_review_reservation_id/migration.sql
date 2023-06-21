/*
  Warnings:

  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `reservationId` to the `SpaceReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SpaceReview` ADD COLUMN `reservationId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `SpaceReview` ADD CONSTRAINT `SpaceReview_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
