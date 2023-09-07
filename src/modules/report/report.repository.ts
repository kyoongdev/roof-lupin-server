import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { QnADTO } from '../qna/dto';
import { ReviewDTO } from '../review/dto';
import { SpaceDTO } from '../space/dto';

import { CreateReportAnswerDTO, CreateReportDTO, ReportAnswerDTO, ReportDTO, UpdateReportDTO } from './dto';
import { UpdateReportAnswerDTO } from './dto/update-report-answer.dto';
import { REPORT_ANSWER_NOT_FOUND, REPORT_NOT_FOUND } from './exception/errorCode';

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
          include: SpaceDTO.getSpacesIncludeOption(),
        },
        spaceReview: {
          include: ReviewDTO.generateInclude(),
        },
        spaceQnA: {
          include: QnADTO.generateInclude(),
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
      throw new NotFoundException(REPORT_NOT_FOUND);
    }

    return new ReportDTO({
      ...report,
      spaceReview: report.spaceReview && {
        ...report.spaceReview,
        images: report.spaceReview.images.map((image) => ({
          id: image.id,
          imageId: image.imageId,
          url: image.image.url,
          isBest: image.isBest,
          reviewId: image.spaceReviewId,
        })),
        space: SpaceDTO.generateSpaceDTO(report.spaceReview.space),
      },
      space: report.space && SpaceDTO.generateSpaceDTO(report.space),
      spaceQnA: report.spaceQnA && {
        ...report.spaceQnA,
        space: SpaceDTO.generateSpaceDTO(report.spaceQnA.space),
      },
      answer: report.answers.filter((answer) => !answer.deletedAt).at(-1),
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
          include: SpaceDTO.getSpacesIncludeOption(),
        },
        spaceReview: {
          include: ReviewDTO.generateInclude(),
        },
        spaceQnA: {
          include: QnADTO.generateInclude(),
        },
        user: {
          include: {
            socials: true,
            setting: true,
          },
        },
      },
    });

    return reports.map(
      (report) =>
        new ReportDTO({
          ...report,
          answer: report.answers.filter((answer) => !answer.deletedAt).at(-1),
          spaceReview: report.spaceReview && {
            ...report.spaceReview,
            images: report.spaceReview.images.map((image) => ({
              id: image.id,
              imageId: image.imageId,
              url: image.image.url,
              isBest: image.isBest,
              reviewId: image.spaceReviewId,
            })),
            space: SpaceDTO.generateSpaceDTO(report.spaceReview.space),
          },
          space: report.space && SpaceDTO.generateSpaceDTO(report.space),
          spaceQnA: report.spaceQnA && {
            ...report.spaceQnA,
            space: SpaceDTO.generateSpaceDTO(report.spaceQnA.space),
          },
        })
    );
  }

  async createReport(userId: string, data: CreateReportDTO) {
    const { content, spaceId, spaceQnaId, spaceReviewId } = data;
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
      throw new NotFoundException(REPORT_ANSWER_NOT_FOUND);
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
