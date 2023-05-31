/*
  Warnings:

  - You are about to alter the column `dueDate` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `reoirtStatus` on the `SpaceReport` table. All the data in the column will be lost.
  - You are about to alter the column `birth` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(8)`.
  - Added the required column `reportStatus` to the `SpaceReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Coupon` MODIFY `dueDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `SpaceReport` DROP COLUMN `reoirtStatus`,
    ADD COLUMN `reportStatus` TINYINT NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `birth` CHAR(8) NULL;
