import { Module } from '@nestjs/common';

import { FCMEvent } from '@/event/fcm';
import { ReportRepository } from '@/modules/report/report.repository';

import { AdminUserRepository } from '../user/user.repository';

import { AdminReportController } from './report.controller';
import { AdminReportService } from './report.service';

@Module({
  providers: [AdminReportService, ReportRepository, FCMEvent, AdminUserRepository],
  exports: [AdminReportService, ReportRepository, FCMEvent, AdminUserRepository],
  controllers: [AdminReportController],
})
export class AdminReportModule {}
