import { Module } from '@nestjs/common';

import { MessageEvent } from '@/event/message';
import { HistoryRepository } from '@/modules/history/history.repository';
import { ReviewRepository } from '@/modules/review/review.repository';

import { HostReviewController } from './review.controller';
import { HostReviewService } from './review.service';

@Module({
  providers: [HostReviewService, ReviewRepository, HistoryRepository, MessageEvent],
  exports: [HostReviewService, ReviewRepository, HistoryRepository, MessageEvent],
  controllers: [HostReviewController],
})
export class HostReviewModule {}
