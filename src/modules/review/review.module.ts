import { Module } from '@nestjs/common';

import { FileService } from '../file/file.service';
import { RentalTypeRepository } from '../rental-type/rental-type.repository';
import { ReservationRepository } from '../reservation/reservation.repository';
import { SpaceRepository } from '../space/space.repository';

import { ReviewController } from './review.controller';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  providers: [
    ReviewService,
    SpaceRepository,
    ReviewRepository,
    RentalTypeRepository,
    ReservationRepository,
    FileService,
  ],
})
export class ReviewModule {}
