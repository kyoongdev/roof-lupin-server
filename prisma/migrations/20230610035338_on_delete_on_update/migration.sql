/*
  Warnings:

  - You are about to alter the column `dueDate` on the `UserCoupon` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `Curation` DROP FOREIGN KEY `Curation_userId_fkey`;

-- DropForeignKey
ALTER TABLE `PublicTransportation` DROP FOREIGN KEY `PublicTransportation_spaceId_fkey`;

-- DropForeignKey
ALTER TABLE `RefundPolicy` DROP FOREIGN KEY `RefundPolicy_spaceId_fkey`;

-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_rentalTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Space` DROP FOREIGN KEY `Space_mainCategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceCategory` DROP FOREIGN KEY `SpaceCategory_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceCategory` DROP FOREIGN KEY `SpaceCategory_spaceId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceCaution` DROP FOREIGN KEY `SpaceCaution_spaceId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceFacility` DROP FOREIGN KEY `SpaceFacility_facilityId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceFacility` DROP FOREIGN KEY `SpaceFacility_spaceId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceHashtag` DROP FOREIGN KEY `SpaceHashtag_hashtagId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceHashtag` DROP FOREIGN KEY `SpaceHashtag_spaceId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceImage` DROP FOREIGN KEY `SpaceImage_imageId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceImage` DROP FOREIGN KEY `SpaceImage_spaceId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceInterest` DROP FOREIGN KEY `SpaceInterest_spaceId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceInterest` DROP FOREIGN KEY `SpaceInterest_userId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceLocation` DROP FOREIGN KEY `SpaceLocation_locationId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceLocation` DROP FOREIGN KEY `SpaceLocation_spaceId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceQnA` DROP FOREIGN KEY `SpaceQnA_spaceId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceQnA` DROP FOREIGN KEY `SpaceQnA_userId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceQnAAnswer` DROP FOREIGN KEY `SpaceQnAAnswer_hostId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceQnAAnswer` DROP FOREIGN KEY `SpaceQnAAnswer_spaceQnAId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceReport` DROP FOREIGN KEY `SpaceReport_spaceId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceReport` DROP FOREIGN KEY `SpaceReport_userId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceService` DROP FOREIGN KEY `SpaceService_serviceId_fkey`;

-- DropForeignKey
ALTER TABLE `SpaceService` DROP FOREIGN KEY `SpaceService_spaceId_fkey`;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `Curation` ADD CONSTRAINT `Curation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Space` ADD CONSTRAINT `Space_mainCategoryId_fkey` FOREIGN KEY (`mainCategoryId`) REFERENCES `MainCategory`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `PublicTransportation` ADD CONSTRAINT `PublicTransportation_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_rentalTypeId_fkey` FOREIGN KEY (`rentalTypeId`) REFERENCES `RentalType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceReport` ADD CONSTRAINT `SpaceReport_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceReport` ADD CONSTRAINT `SpaceReport_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceQnA` ADD CONSTRAINT `SpaceQnA_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceQnA` ADD CONSTRAINT `SpaceQnA_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceQnAAnswer` ADD CONSTRAINT `SpaceQnAAnswer_spaceQnAId_fkey` FOREIGN KEY (`spaceQnAId`) REFERENCES `SpaceQnA`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceQnAAnswer` ADD CONSTRAINT `SpaceQnAAnswer_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `Host`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceInterest` ADD CONSTRAINT `SpaceInterest_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceInterest` ADD CONSTRAINT `SpaceInterest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceImage` ADD CONSTRAINT `SpaceImage_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceImage` ADD CONSTRAINT `SpaceImage_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RefundPolicy` ADD CONSTRAINT `RefundPolicy_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceCaution` ADD CONSTRAINT `SpaceCaution_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceLocation` ADD CONSTRAINT `SpaceLocation_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceLocation` ADD CONSTRAINT `SpaceLocation_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceFacility` ADD CONSTRAINT `SpaceFacility_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceFacility` ADD CONSTRAINT `SpaceFacility_facilityId_fkey` FOREIGN KEY (`facilityId`) REFERENCES `Facility`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceService` ADD CONSTRAINT `SpaceService_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceService` ADD CONSTRAINT `SpaceService_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceCategory` ADD CONSTRAINT `SpaceCategory_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceCategory` ADD CONSTRAINT `SpaceCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceHashtag` ADD CONSTRAINT `SpaceHashtag_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `Space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceHashtag` ADD CONSTRAINT `SpaceHashtag_hashtagId_fkey` FOREIGN KEY (`hashtagId`) REFERENCES `Hashtag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
