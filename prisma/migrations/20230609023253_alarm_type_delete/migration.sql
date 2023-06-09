/*
  Warnings:

  - You are about to drop the column `alarmType` on the `UserAlarm` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `UserAlarm` table. All the data in the column will be lost.
  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `UserAlarm` DROP COLUMN `alarmType`,
    DROP COLUMN `createdAt`,
    ADD COLUMN `isRead` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;
