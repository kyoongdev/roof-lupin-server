/*
  Warnings:

  - You are about to alter the column `dueDate` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `minCost` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `minHour` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `spaceIntroduction` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the `SpaceGuideLine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SpaceLike` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `SpaceGuideLine` DROP FOREIGN KEY `SpaceGuideLine_spaceId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceLike` DROP FOREIGN KEY `SpaceLike_spaceId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceLike` DROP FOREIGN KEY `SpaceLike_userId_fkey`;

-- AlterTable
ALTER TABLE `Coupon` MODIFY `dueDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Space` DROP COLUMN `minCost`,
    DROP COLUMN `minHour`,
    DROP COLUMN `spaceIntroduction`;

-- DropTable
DROP TABLE `SpaceGuideLine`;

-- DropTable
DROP TABLE `SpaceLike`;

-- CreateTable
CREATE TABLE `RefundPolicy` (
    `id` VARCHAR(191) NOT NULL,
    `refundRate` TINYINT NOT NULL,
    `dueDate` TINYINT NOT NULL,
    `dueDateType` TINYINT NOT NULL,
    `spaceId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RefundPolicy` ADD CONSTRAINT `RefundPolicy_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
