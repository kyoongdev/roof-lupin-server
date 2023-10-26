import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';
import { REPORT_ERROR_CODE } from '@/modules/report/exception/errorCode';
import { ReportException } from '@/modules/report/exception/report.exception';

import { HostCreateReportDTO } from '../dto/report';

export class HostReportRepository {
  constructor(private readonly database: PrismaService) {}

  async checkReport(args = {} as Prisma.UserReportFindFirstArgs) {
    return this.database.userReport.findFirst(args);
  }

  async createReport(userId: string, data: HostCreateReportDTO) {
    if (!data.checkIsOnlyOneTarget()) {
      throw new ReportException(REPORT_ERROR_CODE.REPORT_TARGET_LENGTH);
    }
    const { content, spaceQnaId, spaceReviewId } = data;
    const report = await this.database.hostReport.create({
      data: {
        content,
        ...(spaceQnaId && {
          spaceQnA: {
            connect: {
              id: spaceQnaId,
            },
          },
        }),
        ...(spaceReviewId && {
          spaceReview: {
            connect: {
              id: spaceReviewId,
            },
          },
        }),
        host: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return report.id;
  }
}
