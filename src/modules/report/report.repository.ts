import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PagingDTO } from 'wemacu-nestjs';

import { PrismaService } from '@/database/prisma.service';

import { REPORT_ERROR_CODE } from './exception/errorCode';
import { ReportException } from './exception/report.exception';

@Injectable()
export class ReportRepository {
  constructor(private readonly database: PrismaService) {}

  async findReports(args = {} as Prisma.SpaceReportFindManyArgs) {
    const reports = await this.database.spaceReport.findMany(args);

    return reports;
  }

  async findPagingReports(paging: PagingDTO, args = {} as Prisma.SpaceReportFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.database.spaceReport.count({
      where: args.where,
    });
    const rows = await this.database.spaceReport.findMany({
      where: {
        ...args.where,
      },
      skip,
      take,
    });
    return { count, rows };
  }

  async findReport(id: string) {
    const report = await this.database.spaceReport.findUnique({
      where: {
        id,
      },
    });
    if (!report) {
      throw new ReportException(REPORT_ERROR_CODE.NOT_FOUND);
    }

    return report;
  }

  async findReportsWithSpaceId(spaceId: string) {
    const reports = await this.database.spaceReport.findMany({
      where: {
        spaceId,
      },
    });

    return reports;
  }

  async findPagingReportsWithSpaceId(paging: PagingDTO, spaceId: string) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.database.spaceReport.count({
      where: {
        spaceId,
      },
    });
    const rows = await this.database.spaceReport.findMany({
      where: {
        spaceId,
      },
      skip,
      take,
    });

    return { count, rows };
  }
}
