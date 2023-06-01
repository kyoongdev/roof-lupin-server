import { Auth } from 'wemacu-nestjs';

import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('admins/reports', '관리자 신고 관리')
export class AdminReportController {}
