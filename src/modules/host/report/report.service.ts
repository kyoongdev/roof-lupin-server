import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { ReportDTO } from '@/modules/report/dto';
import { ReportRepository } from '@/modules/report/report.repository';

@Injectable()
export class HostReportService {
  constructor(private readonly reportRepository: ReportRepository) {}

  async findReport(id: string) {
    return await this.reportRepository.findReport(id);
  }

  async findPagingReports(paging: PagingDTO, args = {} as Prisma.SpaceReportFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.reportRepository.countReports({
      where: {
        ...args.where,
        deletedAt: null,
      },
    });
    const reports = await this.reportRepository.findReports({
      where: {
        ...args.where,
        deletedAt: null,
      },
      skip,
      take,
    });
    return new PaginationDTO<ReportDTO>(reports, { paging, count });
  }
}
