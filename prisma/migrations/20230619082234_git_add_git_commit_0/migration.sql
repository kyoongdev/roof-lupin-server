/*
  Warnings:

  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `SpaceReviewImage` ADD COLUMN `isBest` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;
