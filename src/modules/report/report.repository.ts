import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PagingDTO } from 'wemacu-nestjs';

import { PrismaService } from '@/database/prisma.service';

import { REPORT_ERROR_CODE } from './exception/errorCode';
import { ReportException } from './exception/report.exception';

@Injectable()
export class ReportRepository {
  constructor(private readonly database: PrismaService) {}

  async countReports(args = {} as Prisma.SpaceReportCountArgs) {
    return await this.database.spaceReport.count(args);
  }

  async findPagingReports(args = {} as Prisma.SpaceReportFindManyArgs) {
    return await this.database.spaceReport.findMany({
      where: {
        ...args.where,
      },
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
      skip: args.skip,
      take: args.take,
    });
  }

  async findReport(id: string) {
    const report = await this.database.spaceReport.findUnique({
      where: {
        id,
      },
    });
    if (!report) {
      throw new ReportException(REPORT_ERROR_CODE.NOT_FOUND());
    }

    return report;
  }
  async createReport() {
    const a = 1;
  }

  async updateReport() {
    const a = 1;
  }

  async deleteReport() {
    const a = 1;
  }
}
