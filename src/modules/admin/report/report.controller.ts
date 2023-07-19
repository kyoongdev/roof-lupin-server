import { Body, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { RequestAdmin, RequestHost } from '@/interface/role.interface';
import { CreateReportAnswerDTO, ReportDTO, UpdateReportAnswerDTO } from '@/modules/report/dto';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminFindReportsQuery } from '../dto/query/report';
import { AdminUpdateReportDTO } from '../dto/report';

import { AdminReportService } from './report.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('reports', '[관리자] 신고 관리')
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
  })
  @ResponseApi({
    type: ReportDTO,
    isPaging: true,
  })
  async getReports(@Paging() paging: PagingDTO, @Query() query: AdminFindReportsQuery) {
    return await this.adminReportService.findPagingReports(paging, query.generateQuery());
  }

  @Patch(':reportId')
  @RequestApi({
    summary: {
      description: '신고 처리',
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

  @Post(':reportId/answers')
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '신고 답변 등록',
      summary: '신고 답변 등록',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createReportAnswer(
    @ReqUser() user: RequestAdmin,
    @Param('reportId') reportId: string,
    @Body() body: CreateReportAnswerDTO
  ) {
    return await this.adminReportService.createReportAnswer(user.id, reportId, body);
  }

  @Patch('answers/:reportAnswerId')
  @RequestApi({
    summary: {
      description: '신고 답변 수정',
      summary: '신고 답변 수정',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateReportAnswer(
    @Param('reportAnswerId') id: string,
    @ReqUser() user: RequestAdmin,
    @Body() body: UpdateReportAnswerDTO
  ) {
    await this.adminReportService.updateReportAnswer(id, user.id, body);
  }

  @Delete('answers/:reportAnswerId')
  @RequestApi({
    summary: {
      description: '신고 답변 삭제',
      summary: '신고 답변 삭제',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteReportAnswer(@Param('reportAnswerId') id: string, @ReqUser() user: RequestAdmin) {
    await this.adminReportService.deleteReportAnswer(id, user.id);
  }
}
