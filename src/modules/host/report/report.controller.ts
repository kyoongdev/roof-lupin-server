import { Get, Param } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

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

  @Get(':reportId/detail')
  @RequestApi({
    summary: {
      description: '신고 상세 조회',
      summary: '신고 상세 조회 - 호스트만 사용 가능합니다.',
    },
    params: {
      name: 'reportId',
      type: 'string',
      required: true,
      description: '신고 아이디',
    },
  })
  @ResponseApi({
    type: ReportDTO,
  })
  async getReport(@Param('reportId') reportId: string) {
    return await this.reportService.findReport(reportId);
  }

  @Get(':spaceId')
  @RequestApi({
    summary: {
      description: '신고 목록 조회',
      summary: '공간 신고 목록 조회 - 호스트만 사용 가능합니다.',
    },
    params: {
      name: 'spaceId',
      type: 'string',
      required: true,
      description: '공간 아이디',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: ReportDTO,
    isPaging: true,
  })
  async getReportsBySpaceId(
    @Paging() paging: PagingDTO,
    @Param('spaceId') spaceId: string,
    @ReqUser() user: RequestHost
  ) {
    return await this.reportService.findPagingReports(paging, {
      where: {
        spaceId,
        space: {
          hostId: user.id,
        },
      },
    });
  }

  @Get()
  @RequestApi({
    summary: {
      description: '신고 목록 조회',
      summary: ' 신고 목록 조회 - 호스트만 사용 가능합니다.',
    },

    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: ReportDTO,
    isPaging: true,
  })
  async getReports(@Paging() paging: PagingDTO, @ReqUser() user: RequestHost) {
    return await this.reportService.findPagingReports(paging, {
      where: {
        space: {
          hostId: user.id,
        },
      },
    });
  }
}
