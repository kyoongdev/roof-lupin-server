/*
  Warnings:

  - You are about to alter the column `bankName` on the `HostAccount` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(5)`.
  - You are about to alter the column `dueDateEndAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dueDateStartAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `HostAccount` MODIFY `bankName` VARCHAR(5) NOT NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDateEndAt` DATETIME NOT NULL,
    MODIFY `dueDateStartAt` DATETIME NOT NULL;
