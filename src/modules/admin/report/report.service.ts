import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { ReportDTO } from '@/modules/report/dto';
import { ReportRepository } from '@/modules/report/report.repository';

import { AdminUpdateReportDTO } from '../dto/report';

@Injectable()
export class AdminReportService {
  constructor(private readonly reportRepository: ReportRepository) {}

  async findReport(reportId: string) {
    return await this.reportRepository.findReport(reportId);
  }

  async findPagingReports(paging: PagingDTO, args = {} as Prisma.SpaceReportFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.reportRepository.countReports({
      where: args.where,
    });
    const reports = await this.reportRepository.findReports({
      where: args.where,
      skip,
      take,
    });
    return new PaginationDTO<ReportDTO>(reports, { count, paging });
  }

  async updateReportStatus(id: string, data: AdminUpdateReportDTO) {
    await this.reportRepository.updateReportStatus(id, data.reportStatus);
  }
}
