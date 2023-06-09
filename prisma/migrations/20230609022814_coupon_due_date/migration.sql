/*
  Warnings:

  - You are about to drop the column `dueDate` on the `Coupon` table. All the data in the column will be lost.
  - Added the required column `dueDate` to the `UserCoupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Coupon` DROP COLUMN `dueDate`;

-- AlterTable
ALTER TABLE `UserCoupon` ADD COLUMN `dueDate` DATETIME NOT NULL;
