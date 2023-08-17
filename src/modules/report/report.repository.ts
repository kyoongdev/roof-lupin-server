import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { QnADTO } from '../qna/dto';
import { ReviewDTO } from '../review/dto';
import { SpaceDTO } from '../space/dto';

import { CreateReportAnswerDTO, CreateReportDTO, ReportDTO, UpdateReportDTO } from './dto';
import { UpdateReportAnswerDTO } from './dto/update-report-answer.dto';
import { REPORT_NOT_FOUND } from './exception/errorCode';

@Injectable()
export class ReportRepository {
  constructor(private readonly database: PrismaService) {}

  async findReport(id: string) {
    const report = await this.database.userReport.findUnique({
      where: {
        id,
      },
      include: {
        answer: {
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
        user: true,
      },
    });

    if (!report) {
      throw new NotFoundException(REPORT_NOT_FOUND);
    }

    return new ReportDTO({
      ...report,
      spaceReview: report.spaceReview
        ? {
            ...report.spaceReview,
            images: report.spaceReview.images.map((image) => ({
              imageId: image.image.id,
              url: image.image.url,
              isBest: image.isBest,
            })),
          }
        : undefined,
      space: SpaceDTO.generateSpaceDTO(report.space),
      spaceQnA: {
        ...report.spaceQnA,
        space: SpaceDTO.generateSpaceDTO(report.spaceQnA.space),
      },
    });
  }

  async findReports(args = {} as Prisma.UserReportFindManyArgs) {
    const reports = await this.database.userReport.findMany({
      ...args,
      include: {
        answer: {
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
        user: true,
      },
    });

    return reports.map(
      (report) =>
        new ReportDTO({
          ...report,
          spaceReview: report.spaceReview
            ? {
                ...report.spaceReview,
                images: report.spaceReview.images.map((image) => ({
                  imageId: image.image.id,
                  url: image.image.url,
                  isBest: image.isBest,
                })),
              }
            : undefined,
          space: SpaceDTO.generateSpaceDTO(report.space),
          spaceQnA: {
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
    await this.database.userReport.delete({
      where: {
        id,
      },
    });
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

  async updateReportAnswer(reportId: string, data: UpdateReportAnswerDTO) {
    await this.database.userReportAnswer.update({
      where: {
        reportId,
      },
      data,
    });
  }

  async deleteReportAnswer(reportAnswerId: string) {
    await this.database.userReportAnswer.delete({
      where: {
        id: reportAnswerId,
      },
    });
  }
}
