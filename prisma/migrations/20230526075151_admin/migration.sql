/*
  Warnings:

  - You are about to alter the column `deletedAt` on the `Admin` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `Host` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `Space` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `SpaceQnA` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `SpaceReport` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `SpaceReview` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Admin` MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `Host` MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `Space` MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `SpaceQnA` MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `SpaceReport` MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `SpaceReview` MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `deletedAt` DATETIME NULL;
