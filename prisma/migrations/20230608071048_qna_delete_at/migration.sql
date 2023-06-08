/*
  Warnings:

  - You are about to alter the column `dueDate` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `deletedAt` on the `SpaceQnA` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `SpaceReport` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `SpaceReview` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Coupon` MODIFY `dueDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `SpaceQnA` DROP COLUMN `deletedAt`;

-- AlterTable
ALTER TABLE `SpaceReport` DROP COLUMN `deletedAt`;

-- AlterTable
ALTER TABLE `SpaceReview` DROP COLUMN `deletedAt`;
