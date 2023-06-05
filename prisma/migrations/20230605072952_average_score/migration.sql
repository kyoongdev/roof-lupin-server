/*
  Warnings:

  - You are about to alter the column `dueDate` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `size` on the `Space` table. All the data in the column will be lost.
  - Added the required column `minCost` to the `Space` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minSize` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Coupon` MODIFY `dueDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Space` DROP COLUMN `size`,
    ADD COLUMN `averageScore` TINYINT NOT NULL DEFAULT 0,
    ADD COLUMN `minCost` MEDIUMINT NOT NULL,
    ADD COLUMN `minSize` SMALLINT NOT NULL;

-- CreateTable
CREATE TABLE `SpaceSize` (
    `id` VARCHAR(191) NOT NULL,
    `size` SMALLINT NOT NULL,
    `spaceId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SpaceSize` ADD CONSTRAINT `SpaceSize_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
