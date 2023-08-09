import { Module } from '@nestjs/common';

import { ReviewRepository } from '@/modules/review/review.repository';

import { HostReviewController } from './review.controller';
import { HostReviewService } from './review.service';

@Module({
  providers: [HostReviewService, ReviewRepository],
  exports: [HostReviewService, ReviewRepository],
  controllers: [HostReviewController],
})
export class HostReviewModule {}
