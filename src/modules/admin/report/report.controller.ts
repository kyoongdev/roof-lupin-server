import { Body, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, IdsDTO, ResponseWithIdDTO } from '@/common';
import { RequestAdmin } from '@/interface/role.interface';
import { CreateReportAnswerDTO, ReportDetailDTO, ReportDTO, UpdateReportAnswerDTO } from '@/modules/report/dto';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminUpdateReportDTO } from '../dto/report';

import { AdminReportService } from './report.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('reports', '[관리자] 신고 관리')
export class AdminReportController {
  constructor(private readonly adminReportService: AdminReportService) {}
}
