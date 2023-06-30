/*
  Warnings:

  - You are about to drop the column `dueDate` on the `UserCoupon` table. All the data in the column will be lost.
  - Added the required column `dueDateEndAt` to the `UserCoupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDateStartAt` to the `UserCoupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserCoupon` DROP COLUMN `dueDate`,
    ADD COLUMN `dueDateEndAt` DATETIME NOT NULL,
    ADD COLUMN `dueDateStartAt` DATETIME NOT NULL;
