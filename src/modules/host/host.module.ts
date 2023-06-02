import { Module } from '@nestjs/common';

import { QnARepository } from '../qna/qna.repository';
import { ReportRepository } from '../report/report.repository';
import { ReviewRepository } from '../review/review.repository';

import { HostController } from './host.controller';
import { HostRepository } from './host.repository';
import { HostService } from './host.service';
import { HostQnAController } from './qna';
import { HostQnAService } from './qna/qna.service';
import { HostReportController } from './report';
import { HostReportService } from './report/report.service';
import { HostReviewController } from './review';
import { HostReviewService } from './review/review.service';

@Module({
  providers: [
    HostService,
    HostRepository,
    HostReviewService,
    ReviewRepository,
    HostQnAService,
    QnARepository,
    HostReportService,
    ReportRepository,
  ],
  controllers: [HostController, HostReviewController, HostQnAController, HostReportController],
})
export class HostModule {}
