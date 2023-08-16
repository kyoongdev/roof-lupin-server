import { Auth } from 'cumuco-nestjs';

import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminReportService } from './report.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('reports', '[관리자] 신고 관리')
export class AdminReportController {
  constructor(private readonly adminReportService: AdminReportService) {}
}
