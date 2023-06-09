/*
  Warnings:

  - You are about to drop the column `code` on the `UserCoupon` table. All the data in the column will be lost.
  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[code]` on the table `Coupon` will be added. If there are existing duplicate values, this will fail.
  - The required column `code` was added to the `Coupon` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX `UserCoupon_code_key` ON `UserCoupon`;

-- AlterTable
ALTER TABLE `Coupon` ADD COLUMN `code` CHAR(8) NOT NULL;

-- AlterTable
ALTER TABLE `UserCoupon` DROP COLUMN `code`,
    MODIFY `dueDate` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Coupon_code_key` ON `Coupon`(`code`);
