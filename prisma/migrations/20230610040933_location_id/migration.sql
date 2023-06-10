/*
  Warnings:

  - The primary key for the `SpaceLocation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The required column `id` was added to the `SpaceLocation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `SpaceLocation` DROP PRIMARY KEY,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;
