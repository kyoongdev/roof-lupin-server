/*
  Warnings:

  - You are about to alter the column `defaultDueDateStart` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `startAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `hostId` on the `ReservationRefund` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ReservationRefund` table. All the data in the column will be lost.
  - You are about to alter the column `usageDateStartAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `usageDateEndAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `ReservationRefund` DROP FOREIGN KEY `ReservationRefund_hostId_fkey`;

-- DropForeignKey
ALTER TABLE `ReservationRefund` DROP FOREIGN KEY `ReservationRefund_userId_fkey`;

-- DropIndex
DROP INDEX `ReservationRefund_reservationId_hostId_key` ON `ReservationRefund`;

-- DropIndex
DROP INDEX `ReservationRefund_reservationId_userId_key` ON `ReservationRefund`;

-- AlterTable
ALTER TABLE `Coupon` MODIFY `defaultDueDateStart` DATETIME NULL;

-- AlterTable
ALTER TABLE `Exhibition` MODIFY `startAt` DATETIME NOT NULL,
    MODIFY `endAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `ReservationRefund` DROP COLUMN `hostId`,
    DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `usageDateStartAt` DATETIME NOT NULL,
    MODIFY `usageDateEndAt` DATETIME NOT NULL;
