import { Module } from '@nestjs/common';

import { MessageEvent } from '@/event/message';
import { ReportRepository } from '@/modules/report/report.repository';

import { AdminUserRepository } from '../user/user.repository';

import { AdminReportController } from './report.controller';
import { AdminReportService } from './report.service';

@Module({
  providers: [AdminReportService, ReportRepository],
  exports: [AdminReportService, ReportRepository],
  controllers: [AdminReportController],
})
export class AdminReportModule {}
