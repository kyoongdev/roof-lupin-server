import { Module } from '@nestjs/common';

import { QnARepository } from '@/modules/qna/qna.repository';
import { ReportRepository } from '@/modules/report/report.repository';
import { ReviewRepository } from '@/modules/review/review.repository';

import { HostReportController } from './report.controller';
import { HostReportRepository } from './report.repository';
import { HostReportService } from './report.service';

@Module({
  providers: [HostReportService, ReportRepository, HostReportRepository, ReviewRepository, QnARepository],
  exports: [HostReportService, ReportRepository],
  controllers: [HostReportController],
})
export class HostReportModule {}
