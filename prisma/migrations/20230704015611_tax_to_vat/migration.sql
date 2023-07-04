/*
  Warnings:

  - You are about to alter the column `defaultDueDateStart` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `startAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endAt` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `vatCost` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `vatCost` on the `Settlement` table. All the data in the column will be lost.
  - You are about to alter the column `dueDateStartAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dueDateEndAt` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `vatCost` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vatCost` to the `Settlement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Coupon` MODIFY `defaultDueDateStart` DATETIME NULL;

-- AlterTable
ALTER TABLE `Exhibition` MODIFY `startAt` DATETIME NOT NULL,
    MODIFY `endAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `vatCost`,
    ADD COLUMN `vatCost` MEDIUMINT NOT NULL;

-- AlterTable
ALTER TABLE `Settlement` DROP COLUMN `vatCost`,
    ADD COLUMN `vatCost` MEDIUMINT NOT NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDateStartAt` DATETIME NOT NULL,
    MODIFY `dueDateEndAt` DATETIME NOT NULL;
