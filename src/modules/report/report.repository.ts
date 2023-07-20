import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { SpaceDTO } from '../space/dto';

import {
  CreateReportAnswerDTO,
  CreateReportDTO,
  ReportAnswerDTO,
  ReportDetailDTO,
  ReportDTO,
  UpdateReportAnswerDTO,
  UpdateReportDTO,
} from './dto';
import { REPORT_ANSWER_NOT_FOUND, REPORT_ERROR_CODE } from './exception/errorCode';
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
        answer: true,
      },
      skip: args.skip,
      take: args.take,
    });
    return reports.map(
      (report) =>
        new ReportDTO({
          ...report,
          isAnswered: !!report.answer,
        })
    );
  }

  async findReport(id: string) {
    const report = await this.database.spaceReport.findUnique({
      where: {
        id,
      },
      include: {
        space: {
          include: {
            location: true,
            reviews: true,
            publicTransportations: true,
            userInterests: true,
            rentalType: true,
          },
        },
        user: true,
        answer: {
          include: {
            admin: true,
          },
        },
      },
    });
    if (!report) {
      throw new ReportException(REPORT_ERROR_CODE.NOT_FOUND());
    }

    return new ReportDetailDTO({
      ...report,
      isAnswered: !!report.answer,
      space: SpaceDTO.generateSpaceDTO(report.space),
    });
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
        answer: true,
      },
    });
    if (!report) {
      return null;
    }

    return new ReportDTO({
      ...report,
      isAnswered: !!report.answer,
    });
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

  async findReportAnswer(id: string) {
    const reportAnswer = await this.database.spaceReportAnswer.findUnique({
      where: {
        id,
      },
      include: {
        admin: true,
      },
    });
    if (!reportAnswer) {
      throw new ReportException(REPORT_ERROR_CODE.NOT_FOUND(REPORT_ANSWER_NOT_FOUND));
    }
    return new ReportAnswerDTO(reportAnswer);
  }

  async createReportAnswer(adminId: string, reportId: string, data: CreateReportAnswerDTO) {
    const report = await this.database.spaceReportAnswer.create({
      data: {
        ...data,
        admin: {
          connect: {
            id: adminId,
          },
        },
        spaceReport: {
          connect: {
            id: reportId,
          },
        },
      },
    });
    return report.id;
  }

  async updateReportAnswer(id: string, data: UpdateReportAnswerDTO) {
    await this.database.spaceReportAnswer.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteReportAnswer(id: string) {
    await this.database.spaceReportAnswer.delete({
      where: {
        id,
      },
    });
  }
}
