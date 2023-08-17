import { Auth } from 'cumuco-nestjs';

import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { HostReportService } from './report.service';

@ApiController('reports', '[호스트] 신고 관리')
@Auth([JwtAuthGuard, RoleGuard('HOST')])
export class HostReportController {
  constructor(private readonly reportService: HostReportService) {}
}
