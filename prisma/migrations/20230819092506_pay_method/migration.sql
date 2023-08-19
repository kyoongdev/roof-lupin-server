/*
  Warnings:

  - You are about to alter the column `defaultDueDateStart` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `startAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `payMethod` on the `Reservation` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.
  - You are about to alter the column `usageDateStartAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `usageDateEndAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[reservationId]` on the table `ReservationRefund` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Coupon` MODIFY `defaultDueDateStart` DATETIME NULL;

-- AlterTable
ALTER TABLE `Exhibition` MODIFY `startAt` DATETIME NOT NULL,
    MODIFY `endAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Reservation` MODIFY `payMethod` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `usageDateStartAt` DATETIME NOT NULL,
    MODIFY `usageDateEndAt` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ReservationRefund_reservationId_key` ON `ReservationRefund`(`reservationId`);
