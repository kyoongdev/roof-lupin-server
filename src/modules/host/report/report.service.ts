import { Injectable } from '@nestjs/common';

import { ReportRepository } from '@/modules/report/report.repository';

@Injectable()
export class HostReportService {
  constructor(private readonly reportRepository: ReportRepository) {}
}
