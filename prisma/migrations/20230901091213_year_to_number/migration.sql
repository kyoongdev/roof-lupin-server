/*
  Warnings:

  - You are about to alter the column `year` on the `BlockedTime` table. The data in that column could be lost. The data in that column will be cast from `Char(4)` to `Int`.
  - You are about to alter the column `month` on the `BlockedTime` table. The data in that column could be lost. The data in that column will be cast from `VarChar(2)` to `Int`.
  - You are about to alter the column `day` on the `BlockedTime` table. The data in that column could be lost. The data in that column will be cast from `VarChar(2)` to `Int`.
  - You are about to alter the column `defaultDueDateStart` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `startAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `year` on the `Settlement` table. The data in that column could be lost. The data in that column will be cast from `Char(4)` to `Int`.
  - You are about to alter the column `month` on the `Settlement` table. The data in that column could be lost. The data in that column will be cast from `VarChar(2)` to `Int`.
  - You are about to alter the column `day` on the `Settlement` table. The data in that column could be lost. The data in that column will be cast from `VarChar(2)` to `Int`.
  - You are about to alter the column `year` on the `TaxReturn` table. The data in that column could be lost. The data in that column will be cast from `Char(4)` to `Int`.
  - You are about to alter the column `month` on the `TaxReturn` table. The data in that column could be lost. The data in that column will be cast from `VarChar(2)` to `Int`.
  - You are about to alter the column `usageDateStartAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `usageDateEndAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `BlockedTime` MODIFY `year` INTEGER NOT NULL,
    MODIFY `month` INTEGER NOT NULL,
    MODIFY `day` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Coupon` MODIFY `defaultDueDateStart` DATETIME NULL;

-- AlterTable
ALTER TABLE `Exhibition` MODIFY `startAt` DATETIME NOT NULL,
    MODIFY `endAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Settlement` MODIFY `year` INTEGER NOT NULL,
    MODIFY `month` INTEGER NOT NULL,
    MODIFY `day` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `TaxReturn` MODIFY `year` INTEGER NOT NULL,
    MODIFY `month` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `usageDateStartAt` DATETIME NOT NULL,
    MODIFY `usageDateEndAt` DATETIME NOT NULL;
