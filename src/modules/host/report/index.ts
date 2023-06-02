import { ApiController } from '@/utils';

import { HostReportService } from './report.service';

@ApiController('hosts/reports', '[호스트] 신고 관리')
export class HostReportController {
  constructor(private readonly reportService: HostReportService) {}
}
