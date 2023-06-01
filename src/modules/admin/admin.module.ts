import { Module } from '@nestjs/common';

import { QnARepository } from '../qna/qna.repository';
import { ReportRepository } from '../report/report.repository';
import { ReviewRepository } from '../review/review.repository';

import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';
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
  ],
  controllers: [AdminController, AdminReviewController, AdminQnAController, AdminReportController],
})
export class AdminModule {}
