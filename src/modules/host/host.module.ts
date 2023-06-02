import { Module } from '@nestjs/common';

import { QnARepository } from '../qna/qna.repository';
import { ReviewRepository } from '../review/review.repository';

import { HostController } from './host.controller';
import { HostRepository } from './host.repository';
import { HostService } from './host.service';
import { HostQnAController } from './qna';
import { HostQnAService } from './qna/qna.service';
import { HostReviewController } from './review';
import { HostReviewService } from './review/review.service';

@Module({
  providers: [HostService, HostRepository, HostReviewService, ReviewRepository, HostQnAService, QnARepository],
  controllers: [HostController, HostReviewController, HostQnAController],
})
export class HostModule {}
