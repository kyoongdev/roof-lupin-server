/*
  Warnings:

  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Space` MODIFY `minCost` MEDIUMINT NOT NULL DEFAULT 0,
    MODIFY `minSize` SMALLINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;
