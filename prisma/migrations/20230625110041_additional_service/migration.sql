/*
  Warnings:

  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `AdditionalService` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `cost` MEDIUMINT NOT NULL,
    `spaceId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AdditionalService` ADD CONSTRAINT `AdditionalService_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
