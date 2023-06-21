/*
  Warnings:

  - You are about to drop the column `isNotForSale` on the `Reservation` table. All the data in the column will be lost.
  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `isNotForSale`;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `BlockedTime` (
    `id` VARCHAR(191) NOT NULL,
    `year` CHAR(4) NOT NULL,
    `month` VARCHAR(2) NOT NULL,
    `day` VARCHAR(2) NOT NULL,
    `startAt` TINYINT NOT NULL,
    `endAt` TINYINT NOT NULL,
    `spaceId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `BlockedTime_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BlockedTime` ADD CONSTRAINT `BlockedTime_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
