/*
  Warnings:

  - You are about to drop the column `locationId` on the `SpaceLocation` table. All the data in the column will be lost.
  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[lat,lng]` on the table `SpaceLocation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jibunAddress` to the `SpaceLocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `SpaceLocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `SpaceLocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roadAddress` to the `SpaceLocation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `SpaceLocation` DROP FOREIGN KEY `SpaceLocation_locationId_fkey`;

-- AlterTable
ALTER TABLE `SpaceLocation` DROP COLUMN `locationId`,
    ADD COLUMN `jibunAddress` VARCHAR(191) NOT NULL,
    ADD COLUMN `lat` VARCHAR(120) NOT NULL,
    ADD COLUMN `lng` VARCHAR(120) NOT NULL,
    ADD COLUMN `roadAddress` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `SpaceLocation_lat_lng_key` ON `SpaceLocation`(`lat`, `lng`);
