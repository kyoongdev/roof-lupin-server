/*
  Warnings:

  - You are about to drop the column `isUsed` on the `UserCoupon` table. All the data in the column will be lost.
  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `UserCoupon` DROP COLUMN `isUsed`,
    MODIFY `dueDate` DATETIME NOT NULL;
