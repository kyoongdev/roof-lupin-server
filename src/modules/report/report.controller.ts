import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { ReviewDTO } from '../review/dto/review.dto';

import { CreateReportDTO, UpdateReportDTO } from './dto';
import { ReportService } from './report.service';

@ApiController('reports', '공간 신고')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('me/paging')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      summary: '나의 공간 신고 목록 불러오기 - 유저만 사용 가능합니다.',
      description: '나의 공간 신고 목록',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: ReviewDTO,
    isPaging: true,
  })
  async getMyReports(@Paging() paging: PagingDTO) {
    return await this.reportService.findPagingReport(paging);
  }

  @Post()
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      summary: '공간 신고 생성하기 - 유저만 사용 가능합니다.',
      description: '공간 신고 생성하기',
    },
    body: {
      type: CreateReportDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createReport(@ReqUser() user: RequestUser, @Body() body: CreateReportDTO) {
    return await this.reportService.createReports(user.id, body);
  }

  @Patch(':reportId')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @UseInterceptors()
  @RequestApi({
    summary: {
      summary: '나의 공간 신고 수정하기 - 나의 신고만 수정이 가능합니다.',
      description: '나의 공간 신고 수정하기',
    },
    body: {
      type: UpdateReportDTO,
    },
    params: {
      name: 'reportId',
      type: 'string',
      description: '신고 ID',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateReport(@Param('reportId') reportId: string, @ReqUser() user: RequestUser, @Body() body: UpdateReportDTO) {
    await this.reportService.updateReport(reportId, user.id, body);
  }

  @Delete(':reportId')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      summary: '나의 공간 신고 삭제하기  - 나의 신고만 삭제가 가능합니다.',
      description: '나의 공간 신고 삭제하기',
    },
    params: {
      name: 'reportId',
      type: 'string',
      description: '신고 ID',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteReport(@Param('reportId') reportId: string, @ReqUser() user: RequestUser) {
    await this.reportService.deleteReport(reportId, user.id);
  }
}
