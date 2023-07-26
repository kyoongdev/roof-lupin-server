/*
  Warnings:

  - You are about to alter the column `defaultDueDateStart` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `startAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `year` on the `Reservation` table. The data in that column could be lost. The data in that column will be cast from `Char(4)` to `SmallInt`.
  - You are about to alter the column `month` on the `Reservation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(2)` to `TinyInt`.
  - You are about to alter the column `day` on the `Reservation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(2)` to `TinyInt`.
  - You are about to alter the column `usageDateStartAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `usageDateEndAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[code]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Coupon` MODIFY `defaultDueDateStart` DATETIME NULL;

-- AlterTable
ALTER TABLE `Exhibition` MODIFY `startAt` DATETIME NOT NULL,
    MODIFY `endAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Reservation` ADD COLUMN `code` VARCHAR(25) NOT NULL,
    MODIFY `year` SMALLINT NOT NULL,
    MODIFY `month` TINYINT NOT NULL,
    MODIFY `day` TINYINT NOT NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `usageDateStartAt` DATETIME NOT NULL,
    MODIFY `usageDateEndAt` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Reservation_code_key` ON `Reservation`(`code`);
