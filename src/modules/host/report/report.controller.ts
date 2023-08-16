import { Get, Param } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { RequestHost } from '@/interface/role.interface';
import { ReportDTO } from '@/modules/report/dto';
import { ApiController, ReqUser } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { HostReportService } from './report.service';

@ApiController('reports', '[호스트] 신고 관리')
@Auth([JwtAuthGuard, RoleGuard('HOST')])
export class HostReportController {
  constructor(private readonly reportService: HostReportService) {}
}
