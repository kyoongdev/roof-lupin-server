import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { QnADTO } from '../qna/dto';
import { ReviewDTO } from '../review/dto';
import { SpaceDTO } from '../space/dto';

import { CreateReportAnswerDTO, CreateReportDTO, ReportAnswerDTO, ReportDTO, UpdateReportDTO } from './dto';
import { UpdateReportAnswerDTO } from './dto/update-report-answer.dto';
import { REPORT_ERROR_CODE } from './exception/errorCode';
import { ReportException } from './exception/report.exception';

@Injectable()
export class ReportRepository {
  constructor(private readonly database: PrismaService) {}

  async checkReport(args = {} as Prisma.UserReportFindFirstArgs) {
    return this.database.userReport.findFirst(args);
  }

  async findReport(id: string, answerWhere = {} as Prisma.UserReportAnswerWhereInput) {
    const report = await this.database.userReport.findUnique({
      where: {
        id,
      },
      include: {
        answers: {
          where: answerWhere,
          include: {
            admin: true,
          },
        },
        space: {
          include: SpaceDTO.generateSpaceInclude(),
        },
        spaceReview: {
          include: ReviewDTO.generateInclude(),
        },
        spaceReviewAnswer: {
          include: {
            host: true,
          },
        },
        spaceQnA: {
          include: QnADTO.generateInclude(),
        },
        spaceQnAAnswer: {
          include: {
            host: true,
          },
        },
        user: {
          include: {
            socials: true,
            setting: true,
          },
        },
      },
    });

    if (!report) {
      throw new ReportException(REPORT_ERROR_CODE.REPORT_NOT_FOUND);
    }

    return new ReportDTO({
      ...report,
      spaceReview: report.spaceReview && ReviewDTO.generateReviewDTO(report.spaceReview),
      space: report.space && SpaceDTO.generateSpaceDTO(report.space),
      spaceQnA: report.spaceQnA && {
        ...report.spaceQnA,
        space: SpaceDTO.generateSpaceDTO(report.spaceQnA.space),
      },
      answer: report.answers.filter((answer) => !answer.deletedAt).at(-1),
      spaceReviewAnswer: report.spaceReviewAnswer,
      spaceQnAAnswer: report.spaceQnAAnswer,
    });
  }

  async countReports(args = {} as Prisma.UserReportCountArgs) {
    return this.database.userReport.count(args);
  }

  async findReports(args = {} as Prisma.UserReportFindManyArgs, answerWhere = {} as Prisma.UserReportAnswerWhereInput) {
    const reports = await this.database.userReport.findMany({
      ...args,
      include: {
        answers: {
          where: answerWhere,
          include: {
            admin: true,
          },
        },
        space: {
          include: SpaceDTO.generateSpaceInclude(),
        },
        spaceReview: {
          include: ReviewDTO.generateInclude(),
        },
        spaceReviewAnswer: {
          include: {
            host: true,
          },
        },
        spaceQnA: {
          include: QnADTO.generateInclude(),
        },
        spaceQnAAnswer: {
          include: {
            host: true,
          },
        },
        user: {
          include: {
            socials: true,
            setting: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return reports.map(
      (report) =>
        new ReportDTO({
          ...report,
          answer: report.answers.filter((answer) => !answer.deletedAt).at(-1),
          spaceReview: report.spaceReview && ReviewDTO.generateReviewDTO(report.spaceReview),
          space: report.space && SpaceDTO.generateSpaceDTO(report.space),
          spaceQnA: report.spaceQnA && {
            ...report.spaceQnA,
            space: SpaceDTO.generateSpaceDTO(report.spaceQnA.space),
          },
          spaceReviewAnswer: report.spaceReviewAnswer,
          spaceQnAAnswer: report.spaceQnAAnswer,
        })
    );
  }

  async createReport(userId: string, data: CreateReportDTO) {
    if (!data.checkIsOnlyOneTarget()) {
      throw new ReportException(REPORT_ERROR_CODE.REPORT_TARGET_LENGTH);
    }
    const { content, spaceId, spaceQnaId, spaceReviewId, reviewAnswerId, qnaAnswerId } = data;
    const report = await this.database.userReport.create({
      data: {
        content,
        ...(spaceId && {
          space: {
            connect: {
              id: spaceId,
            },
          },
        }),
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
        ...(reviewAnswerId && {
          spaceReviewAnswer: {
            connect: {
              id: reviewAnswerId,
            },
          },
        }),
        ...(qnaAnswerId && {
          spaceQnAAnswer: {
            connect: {
              id: qnaAnswerId,
            },
          },
        }),
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return report.id;
  }

  async updateReport(id: string, data: UpdateReportDTO) {
    await this.database.userReport.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteReport(id: string) {
    await this.database.userReport.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async hardDeleteReport(id: string) {
    await this.database.userReport.delete({
      where: {
        id,
      },
    });
  }

  async checkReportAnswer(args = {} as Prisma.UserReportAnswerFindFirstArgs) {
    return this.database.userReportAnswer.findFirst(args);
  }

  async findReportAnswer(reportAnswerId: string) {
    const reportAnswer = await this.database.userReportAnswer.findUnique({
      where: {
        id: reportAnswerId,
      },
      include: {
        admin: true,
      },
    });

    if (!reportAnswer) {
      throw new ReportException(REPORT_ERROR_CODE.REPORT_ANSWER_NOT_FOUND);
    }

    return new ReportAnswerDTO(reportAnswer);
  }

  async createReportAnswer(reportId: string, adminId: string, data: CreateReportAnswerDTO) {
    const reportAnswer = await this.database.userReportAnswer.create({
      data: {
        ...data,
        admin: {
          connect: {
            id: adminId,
          },
        },
        report: {
          connect: {
            id: reportId,
          },
        },
      },
    });

    return reportAnswer.id;
  }

  async updateReportAnswer(id: string, data: UpdateReportAnswerDTO) {
    await this.database.userReportAnswer.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteReportAnswer(reportAnswerId: string) {
    await this.database.userReportAnswer.update({
      where: {
        id: reportAnswerId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
  async hardDeleteReportAnswer(reportAnswerId: string) {
    await this.database.userReportAnswer.delete({
      where: {
        id: reportAnswerId,
      },
    });
  }
}
