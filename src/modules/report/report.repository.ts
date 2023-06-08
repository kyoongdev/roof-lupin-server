import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CreateReportDTO, ReportDTO, UpdateReportDTO } from './dto';
import { REPORT_ERROR_CODE } from './exception/errorCode';
import { ReportException } from './exception/report.exception';

@Injectable()
export class ReportRepository {
  constructor(private readonly database: PrismaService) {}

  async countReports(args = {} as Prisma.SpaceReportCountArgs) {
    return await this.database.spaceReport.count(args);
  }

  async findReports(args = {} as Prisma.SpaceReportFindManyArgs) {
    const reports = await this.database.spaceReport.findMany({
      where: {
        ...args.where,
      },
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
      include: {
        space: true,
        user: true,
      },
      skip: args.skip,
      take: args.take,
    });
    return reports.map((report) => new ReportDTO(report));
  }

  async findReport(id: string) {
    const report = await this.database.spaceReport.findUnique({
      where: {
        id,
      },
      include: {
        space: true,
        user: true,
      },
    });
    if (!report) {
      throw new ReportException(REPORT_ERROR_CODE.NOT_FOUND());
    }

    return new ReportDTO(report);
  }

  async checkUserReportBySpaceId(spaceId: string, userId: string) {
    const report = await this.database.spaceReport.findFirst({
      where: {
        spaceId,
        userId,
      },
      include: {
        space: true,
        user: true,
      },
    });
    if (!report) {
      return null;
    }

    return new ReportDTO(report);
  }

  async createReport(userId: string, data: CreateReportDTO) {
    const { spaceId, ...rest } = data;
    const report = await this.database.spaceReport.create({
      data: {
        ...rest,
        user: {
          connect: {
            id: userId,
          },
        },
        space: {
          connect: {
            id: spaceId,
          },
        },
      },
    });
    return report.id;
  }

  async updateReport(id: string, data: UpdateReportDTO) {
    await this.database.spaceReport.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateReportStatus(id: string, status: number) {
    await this.database.spaceReport.update({
      where: {
        id,
      },
      data: {
        reportStatus: status,
      },
    });
  }

  async deleteReport(id: string) {
    await this.database.spaceReport.delete({
      where: {
        id,
      },
    });
  }
}
