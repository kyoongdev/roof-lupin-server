import { Body, Post } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { ResponseWithIdDTO } from '@/common';
import { RequestHost } from '@/interface/role.interface';
import { ApiController, ReqUser, ResponseWithId } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { HostCreateQnAReportDTO, HostCreateReviewReportDTO } from '../dto/report';

import { HostReportService } from './report.service';

@ApiController('reports', '[호스트] 신고 관리')
@Auth([JwtAuthGuard, RoleGuard('HOST')])
export class HostReportController {
  constructor(private readonly reportService: HostReportService) {}

  @Post('reviews')
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
  async createReviewReport(@ReqUser() user: RequestHost, @Body() body: HostCreateReviewReportDTO) {
    return await this.reportService.createReviewReport(user.id, body);
  }

  @Post('qnas')
  @RequestApi({
    summary: {
      description: 'qna 신고 생성',
      summary: 'qna 신고 생성',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createQnAReport(@ReqUser() user: RequestHost, @Body() body: HostCreateQnAReportDTO) {
    return await this.reportService.createQnAReport(user.id, body);
  }
}
