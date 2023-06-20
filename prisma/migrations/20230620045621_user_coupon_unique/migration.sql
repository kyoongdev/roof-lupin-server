/*
  Warnings:

  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[couponId]` on the table `UserCoupon` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserCoupon_couponId_key` ON `UserCoupon`(`couponId`);
