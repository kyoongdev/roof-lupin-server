/*
  Warnings:

  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropIndex
DROP INDEX `Location_lat_lng_key` ON `Location`;

-- DropIndex
DROP INDEX `SpaceLocation_lat_lng_key` ON `SpaceLocation`;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;
