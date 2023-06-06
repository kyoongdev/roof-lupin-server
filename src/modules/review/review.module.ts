import { Module } from '@nestjs/common';

import { LocationRepository } from '../location/location.repository';
import { SpaceRepository } from '../space/space.repository';

import { ReviewController } from './review.controller';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, SpaceRepository, ReviewRepository, LocationRepository],
})
export class ReviewModule {}
