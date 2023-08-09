import { Module } from '@nestjs/common';

import { ReviewRepository } from '@/modules/review/review.repository';

import { AdminReviewController } from './review.controller';
import { AdminReviewService } from './review.service';

@Module({
  providers: [AdminReviewService, ReviewRepository],
  exports: [AdminReviewService, ReviewRepository],
  controllers: [AdminReviewController],
})
export class AdminReviewModule {}
