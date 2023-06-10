/*
  Warnings:

  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `highlightTitle` to the `MainCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MainCategory` ADD COLUMN `highlightTitle` VARCHAR(120) NOT NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;
