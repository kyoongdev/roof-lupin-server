/*
  Warnings:

  - You are about to alter the column `dueDate` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `salt` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Admin` ADD COLUMN `salt` VARCHAR(191) NOT NULL,
    MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Coupon` MODIFY `dueDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Host` MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Space` MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `SpaceQnA` MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `SpaceReport` MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `SpaceReview` MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `deletedAt` DATETIME(3) NULL;
