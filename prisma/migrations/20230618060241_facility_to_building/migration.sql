/*
  Warnings:

  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `Facility` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SpaceFacility` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `SpaceFacility` DROP FOREIGN KEY `SpaceFacility_facilityId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceFacility` DROP FOREIGN KEY `SpaceFacility_spaceId_fkey`;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;

-- DropTable
DROP TABLE `Facility`;

-- DropTable
DROP TABLE `SpaceFacility`;

-- CreateTable
CREATE TABLE `SpaceBuilding` (
    `spaceId` VARCHAR(191) NOT NULL,
    `buildingId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`spaceId`, `buildingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Building` (
    `id` VARCHAR(191) NOT NULL,
    `iconPath` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SpaceBuilding` ADD CONSTRAINT `SpaceBuilding_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceBuilding` ADD CONSTRAINT `SpaceBuilding_buildingId_fkey` FOREIGN KEY (`buildingId`) REFERENCES `Building`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
