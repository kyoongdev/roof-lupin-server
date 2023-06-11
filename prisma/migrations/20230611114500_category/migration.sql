/*
  Warnings:

  - You are about to drop the column `mainCategoryId` on the `Space` table. All the data in the column will be lost.
  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `MainCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Space` DROP FOREIGN KEY `Space_mainCategoryId_fkey`;

-- AlterTable
ALTER TABLE `Category` ADD COLUMN `isContent` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Space` DROP COLUMN `mainCategoryId`;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;

-- DropTable
DROP TABLE `MainCategory`;
