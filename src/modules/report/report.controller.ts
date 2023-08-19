import { Body, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { ResponseWithIdDTO } from '@/common';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, JwtAuthGuard, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { RoleGuard } from '@/utils/guards/role.guard';

import { CreateQnAReportDTO, CreateReviewReportDTO, CreateSpaceReportDTO, ReportDTO } from './dto';
import { FindReportsQuery } from './dto/query';
import { ReportService } from './report.service';

@Auth([JwtAuthGuard, RoleGuard('USER')])
@ApiController('reports', '신고')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

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
  async getReports(@ReqUser() user: RequestUser, @Paging() paging: PagingDTO, @Query() query: FindReportsQuery) {
    return await this.reportService.findReportPagingReports(paging, user.id, query.generateQuery());
  }

  @Post('spaces')
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '신고 생성',
      summary: '신고 생성',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createSpaceReport(@ReqUser() user: RequestUser, @Body() body: CreateSpaceReportDTO) {
    return await this.reportService.createSpaceReport(user.id, body);
  }

  @Post('reviews')
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '리뷰 신고 생성',
      summary: '리뷰 신고 생성',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createSpaceReviewReport(@ReqUser() user: RequestUser, @Body() body: CreateReviewReportDTO) {
    return await this.reportService.createReviewReport(user.id, body);
  }

  @Post('qnas')
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: 'QnA 신고 생성',
      summary: 'QnA 신고 생성',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createSpaceQnAReport(@ReqUser() user: RequestUser, @Body() body: CreateQnAReportDTO) {
    return await this.reportService.createQnAReport(user.id, body);
  }
}
