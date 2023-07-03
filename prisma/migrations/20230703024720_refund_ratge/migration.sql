/*
  Warnings:

  - You are about to alter the column `startAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `dueDate` on the `RefundPolicy` table. All the data in the column will be lost.
  - You are about to drop the column `dueDateType` on the `RefundPolicy` table. All the data in the column will be lost.
  - You are about to drop the column `refundRate` on the `RefundPolicy` table. All the data in the column will be lost.
  - You are about to alter the column `dueDateEndAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dueDateStartAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Exhibition` MODIFY `startAt` DATETIME NOT NULL,
    MODIFY `endAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `RefundPolicy` DROP COLUMN `dueDate`,
    DROP COLUMN `dueDateType`,
    DROP COLUMN `refundRate`,
    ADD COLUMN `dueDateRefundRate` TINYINT NOT NULL DEFAULT 0,
    ADD COLUMN `eightDayRefundRate` TINYINT NOT NULL DEFAULT 0,
    ADD COLUMN `fiveDayRefundRate` TINYINT NOT NULL DEFAULT 0,
    ADD COLUMN `fourDayRefundRate` TINYINT NOT NULL DEFAULT 0,
    ADD COLUMN `oneDayRefundRate` TINYINT NOT NULL DEFAULT 0,
    ADD COLUMN `sevenDayRefundRate` TINYINT NOT NULL DEFAULT 0,
    ADD COLUMN `sixDayRefundRate` TINYINT NOT NULL DEFAULT 0,
    ADD COLUMN `threeDayRefundRate` TINYINT NOT NULL DEFAULT 0,
    ADD COLUMN `twoDayRefundRate` TINYINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDateEndAt` DATETIME NOT NULL,
    MODIFY `dueDateStartAt` DATETIME NOT NULL;
