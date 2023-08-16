import { Injectable } from '@nestjs/common';

import { FCMEvent } from '@/event/fcm';
import { ReportRepository } from '@/modules/report/report.repository';

import { AdminUserRepository } from '../user/user.repository';

@Injectable()
export class AdminReportService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly fcmEvent: FCMEvent,
    private readonly userRepository: AdminUserRepository
  ) {}
}
