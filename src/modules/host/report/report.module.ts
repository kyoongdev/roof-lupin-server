import { Module } from '@nestjs/common';

import { ReportRepository } from '@/modules/report/report.repository';

import { HostReportController } from './report.controller';
import { HostReportService } from './report.service';

@Module({
  providers: [HostReportService, ReportRepository],
  exports: [HostReportService, ReportRepository],
  controllers: [HostReportController],
})
export class HostReportModule {}
