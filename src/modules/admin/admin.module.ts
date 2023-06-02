import { Module } from '@nestjs/common';

import { HostRepository } from '../host/host.repository';
import { QnARepository } from '../qna/qna.repository';
import { ReportRepository } from '../report/report.repository';
import { ReviewRepository } from '../review/review.repository';

import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';
import { AdminHostController } from './host';
import { AdminHostService } from './host/host.service';
import { AdminQnAController } from './qna';
import { AdminQnAService } from './qna/qna.service';
import { AdminReportController } from './report';
import { AdminReportService } from './report/report.service';
import { AdminReviewController } from './review';
import { AdminReviewService } from './review/review.service';

@Module({
  providers: [
    AdminService,
    AdminRepository,
    AdminReviewService,
    ReviewRepository,
    AdminQnAService,
    QnARepository,
    AdminReportService,
    ReportRepository,
    AdminHostService,
    HostRepository,
  ],
  controllers: [AdminController, AdminReviewController, AdminQnAController, AdminReportController, AdminHostController],
})
export class AdminModule {}
