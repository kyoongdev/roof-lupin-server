/*
  Warnings:

  - You are about to alter the column `startAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `dueDateRefundRate` on the `RefundPolicy` table. All the data in the column will be lost.
  - You are about to drop the column `eightDayRefundRate` on the `RefundPolicy` table. All the data in the column will be lost.
  - You are about to drop the column `fiveDayRefundRate` on the `RefundPolicy` table. All the data in the column will be lost.
  - You are about to drop the column `fourDayRefundRate` on the `RefundPolicy` table. All the data in the column will be lost.
  - You are about to drop the column `oneDayRefundRate` on the `RefundPolicy` table. All the data in the column will be lost.
  - You are about to drop the column `sevenDayRefundRate` on the `RefundPolicy` table. All the data in the column will be lost.
  - You are about to drop the column `sixDayRefundRate` on the `RefundPolicy` table. All the data in the column will be lost.
  - You are about to drop the column `threeDayRefundRate` on the `RefundPolicy` table. All the data in the column will be lost.
  - You are about to drop the column `twoDayRefundRate` on the `RefundPolicy` table. All the data in the column will be lost.
  - You are about to alter the column `dueDateEndAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dueDateStartAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `daysBefore` to the `RefundPolicy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refundRate` to the `RefundPolicy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Exhibition` MODIFY `startAt` DATETIME NOT NULL,
    MODIFY `endAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `RefundPolicy` DROP COLUMN `dueDateRefundRate`,
    DROP COLUMN `eightDayRefundRate`,
    DROP COLUMN `fiveDayRefundRate`,
    DROP COLUMN `fourDayRefundRate`,
    DROP COLUMN `oneDayRefundRate`,
    DROP COLUMN `sevenDayRefundRate`,
    DROP COLUMN `sixDayRefundRate`,
    DROP COLUMN `threeDayRefundRate`,
    DROP COLUMN `twoDayRefundRate`,
    ADD COLUMN `daysBefore` TINYINT NOT NULL,
    ADD COLUMN `refundRate` TINYINT NOT NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDateEndAt` DATETIME NOT NULL,
    MODIFY `dueDateStartAt` DATETIME NOT NULL;
