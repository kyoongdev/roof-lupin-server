import { Body, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { RequestAdmin } from '@/interface/role.interface';
import { CreateReportAnswerDTO, ReportDTO, UpdateReportDTO } from '@/modules/report/dto';
import { UpdateReportAnswerDTO } from '@/modules/report/dto/update-report-answer.dto';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminFindReportsQuery } from '../dto/query/report';

import { AdminReportService } from './report.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('reports', '[관리자] 신고 관리')
export class AdminReportController {
  constructor(private readonly reportService: AdminReportService) {}

  @Get(':reportId/detail')
  @RequestApi({
    summary: {
      description: '신고 상세 조회',
      summary: '신고 상세 조회',
    },
  })
  @ResponseApi({
    type: ReportDTO,
  })
  async getReport(@Param('reportId') reportId: string) {
    return await this.reportService.findReport(reportId);
  }

  @Get()
  @RequestApi({
    summary: {
      description: '신고 목록 조회',
      summary: '신고 목록 조회',
    },
  })
  @ResponseApi({
    type: ReportDTO,
    isPaging: true,
  })
  async getReports(@Paging() paging: PagingDTO, @Query() query: AdminFindReportsQuery) {
    return await this.reportService.findPagingReport(paging, query.generateQuery());
  }

  @Post(':reportId/answers')
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '신고 답변 생성',
      summary: '신고 답변 생성',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createReportAnswer(
    @Param('reportId') reportId: string,
    @ReqUser() user: RequestAdmin,
    @Body() data: CreateReportAnswerDTO
  ) {
    return await this.reportService.createReportAnswer(reportId, user.id, data);
  }

  @Patch(':reportId')
  @RequestApi({
    summary: {
      description: '신고 처리',
      summary: '신고 처리',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateReport(@Param('reportId') reportId: string, @Body() data: UpdateReportDTO) {
    await this.reportService.updateReport(reportId, data);
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
  async updateReportAnswer(@Param('reportAnswerId') reportAnswerId: string, @Body() data: UpdateReportAnswerDTO) {
    await this.reportService.updateReportAnswer(reportAnswerId, data);
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
  async deleteReportAnswer(@Param('reportAnswerId') reportAnswerId: string) {
    await this.reportService.deleteReportAnswer(reportAnswerId);
  }
}
