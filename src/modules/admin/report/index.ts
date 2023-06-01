import { Body, Get, Param, Patch } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO } from '@/common';
import { ReportDTO } from '@/modules/report/dto';
import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminUpdateReportDTO } from '../dto/report';

import { AdminReportService } from './report.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('admins/reports', '관리자 신고 관리')
export class AdminReportController {
  constructor(private readonly adminReportService: AdminReportService) {}

  @Get(':reportId/detail')
  @RequestApi({
    summary: {
      description: '[관리자]신고 상세 조회',
      summary: '신고 상세 조회',
    },
    params: {
      name: 'reportId',
      type: 'string',
      description: '신고 아이디',
    },
  })
  @ResponseApi({
    type: ReportDTO,
  })
  async getReport(@Param('reportId') reportId: string) {
    return await this.adminReportService.findReport(reportId);
  }

  @Get()
  @RequestApi({
    summary: {
      description: '[관리자]신고 조회',
      summary: '신고 조회',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: ReportDTO,
    isPaging: true,
  })
  async getReports(@Paging() paging: PagingDTO) {
    return await this.adminReportService.findPagingReports(paging);
  }

  @Patch(':reportId')
  @RequestApi({
    summary: {
      description: '[관리자]신고 처리',
      summary: '신고 처리',
    },
    params: {
      name: 'reportId',
      type: 'string',
      description: '신고 아이디',
    },
    body: {
      type: AdminUpdateReportDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateReportStatus(@Param('reportId') reportId: string, @Body() body: AdminUpdateReportDTO) {
    await this.adminReportService.updateReportStatus(reportId, body);
  }
}
