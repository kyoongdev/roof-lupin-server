import { ApiController } from '@/utils';

import { ReportService } from './report.service';

@ApiController('reports', '공간 신고')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
}
