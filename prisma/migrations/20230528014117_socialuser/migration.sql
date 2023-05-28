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
-- DropIndex
DROP INDEX `User_phoneNumber_key` ON `User`;

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
ALTER TABLE `User` ADD COLUMN `birth` VARCHAR(191) NULL,
    ADD COLUMN `gender` TINYINT NULL,
    MODIFY `name` VARCHAR(120) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `phoneNumber` CHAR(11) NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- CreateTable
CREATE TABLE `UserSocial` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `socialId` VARCHAR(191) NOT NULL,
    `socialType` TINYINT NOT NULL,

    UNIQUE INDEX `UserSocial_socialId_key`(`socialId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserSocial` ADD CONSTRAINT `UserSocial_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
