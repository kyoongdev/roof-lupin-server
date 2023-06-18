/*
  Warnings:

  - You are about to drop the column `merchantPurchaseCost` on the `TaxReturn` table. All the data in the column will be lost.
  - You are about to drop the column `merchantSalesCost` on the `TaxReturn` table. All the data in the column will be lost.
  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `cost` to the `TaxReturn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TaxReturn` DROP COLUMN `merchantPurchaseCost`,
    DROP COLUMN `merchantSalesCost`,
    ADD COLUMN `cost` MEDIUMINT NOT NULL;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;
