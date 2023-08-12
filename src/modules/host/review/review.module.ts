import { Module } from '@nestjs/common';

import { HistoryRepository } from '@/modules/history/history.repository';
import { ReviewRepository } from '@/modules/review/review.repository';

import { HostReviewController } from './review.controller';
import { HostReviewService } from './review.service';

@Module({
  providers: [HostReviewService, ReviewRepository, HistoryRepository],
  exports: [HostReviewService, ReviewRepository, HistoryRepository],
  controllers: [HostReviewController],
})
export class HostReviewModule {}
