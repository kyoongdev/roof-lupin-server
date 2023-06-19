/*
  Warnings:

  - You are about to alter the column `averageScore` on the `Space` table. The data in that column could be lost. The data in that column will be cast from `Decimal(1,1)` to `Decimal(2,1)`.
  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Space` MODIFY `averageScore` DECIMAL(2, 1) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;
