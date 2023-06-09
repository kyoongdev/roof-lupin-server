yarn run v1.22.19
$ /Users/kyoongdev/Documents/wemacu/roof-lupin-server/node_modules/.bin/prisma migrate diff --from-schema-datamodel prisma/schema.prisma --to-schema-datasource prisma/schema.prisma --script
-- DropIndex
DROP INDEX `UserAlarm_jobId_key` ON `UserAlarm`;

-- AlterTable
ALTER TABLE `UserAlarm` DROP COLUMN `jobId`;

-- AlterTable
ALTER TABLE `UserCoupon` MODIFY `dueDate` datetime NOT NULL;

-- CreateIndex
CREATE INDEX `Curation_userId_fkey` ON `Curation`(`userId` ASC);

-- CreateIndex
CREATE INDEX `Space_homeCategoryId_fkey` ON `Space`(`homeCategoryId` ASC);

-- CreateIndex
CREATE INDEX `Space_hostId_fkey` ON `Space`(`hostId` ASC);

-- CreateIndex
CREATE INDEX `SpaceSize_spaceId_fkey` ON `SpaceSize`(`spaceId` ASC);

-- CreateIndex
CREATE INDEX `PublicTransportation_spaceId_fkey` ON `PublicTransportation`(`spaceId` ASC);

-- CreateIndex
CREATE INDEX `RentalType_spaceId_fkey` ON `RentalType`(`spaceId` ASC);

-- CreateIndex
CREATE INDEX `Reservation_rentalTypeId_fkey` ON `Reservation`(`rentalTypeId` ASC);

-- CreateIndex
CREATE INDEX `Reservation_userId_fkey` ON `Reservation`(`userId` ASC);

-- CreateIndex
CREATE INDEX `SpaceReport_spaceId_fkey` ON `SpaceReport`(`spaceId` ASC);

-- CreateIndex
CREATE INDEX `SpaceReport_userId_fkey` ON `SpaceReport`(`userId` ASC);

-- CreateIndex
CREATE INDEX `SpaceQnA_spaceId_fkey` ON `SpaceQnA`(`spaceId` ASC);

-- CreateIndex
CREATE INDEX `SpaceQnA_userId_fkey` ON `SpaceQnA`(`userId` ASC);

-- CreateIndex
CREATE INDEX `SpaceQnAAnswer_hostId_fkey` ON `SpaceQnAAnswer`(`hostId` ASC);

-- CreateIndex
CREATE INDEX `SpaceQnAAnswer_spaceQnAId_fkey` ON `SpaceQnAAnswer`(`spaceQnAId` ASC);

-- CreateIndex
CREATE INDEX `SpaceReview_spaceId_fkey` ON `SpaceReview`(`spaceId` ASC);

-- CreateIndex
CREATE INDEX `SpaceReview_userId_fkey` ON `SpaceReview`(`userId` ASC);

-- CreateIndex
CREATE INDEX `SpaceReviewImage_imageId_fkey` ON `SpaceReviewImage`(`imageId` ASC);

-- CreateIndex
CREATE INDEX `SpaceInterest_spaceId_fkey` ON `SpaceInterest`(`spaceId` ASC);

-- CreateIndex
CREATE INDEX `SpaceImage_imageId_fkey` ON `SpaceImage`(`imageId` ASC);

-- CreateIndex
CREATE INDEX `RefundPolicy_spaceId_fkey` ON `RefundPolicy`(`spaceId` ASC);

-- CreateIndex
CREATE INDEX `SpaceCaution_spaceId_fkey` ON `SpaceCaution`(`spaceId` ASC);

-- CreateIndex
CREATE INDEX `SpaceFacility_facilityId_fkey` ON `SpaceFacility`(`facilityId` ASC);

-- CreateIndex
CREATE INDEX `SpaceService_serviceId_fkey` ON `SpaceService`(`serviceId` ASC);

-- CreateIndex
CREATE INDEX `SpaceCategory_categoryId_fkey` ON `SpaceCategory`(`categoryId` ASC);

-- CreateIndex
CREATE INDEX `SpaceHashtag_hashtagId_fkey` ON `SpaceHashtag`(`hashtagId` ASC);

-- CreateIndex
CREATE INDEX `UserAlarm_userId_fkey` ON `UserAlarm`(`userId` ASC);

-- CreateIndex
CREATE INDEX `SearchRecord_userId_fkey` ON `SearchRecord`(`userId` ASC);

-- CreateIndex
CREATE INDEX `UserSocial_userId_fkey` ON `UserSocial`(`userId` ASC);

-- CreateIndex
CREATE INDEX `UserLocation_locationId_fkey` ON `UserLocation`(`locationId` ASC);

-- CreateIndex
CREATE INDEX `UserLocation_userId_fkey` ON `UserLocation`(`userId` ASC);

-- CreateIndex
CREATE INDEX `UserCoupon_couponId_fkey` ON `UserCoupon`(`couponId` ASC);

-- CreateIndex
CREATE INDEX `UserCoupon_userId_fkey` ON `UserCoupon`(`userId` ASC);

Done in 0.87s.
