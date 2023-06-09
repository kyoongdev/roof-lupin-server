/*
  Warnings:

  - You are about to drop the column `endAt` on the `TimeCostInfo` table. All the data in the column will be lost.
  - You are about to drop the column `startAt` on the `TimeCostInfo` table. All the data in the column will be lost.
  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `time` to the `TimeCostInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TimeCostInfo` DROP COLUMN `endAt`,
    DROP COLUMN `startAt`,
    ADD COLUMN `time` TINYINT NOT NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;
