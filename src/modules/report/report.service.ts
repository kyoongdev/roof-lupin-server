import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { QnARepository } from '../qna/qna.repository';
import { CreateReviewAnswerDTO } from '../review/dto';
import { ReviewRepository } from '../review/review.repository';
import { SpaceRepository } from '../space/space.repository';

import { CreateQnAReportDTO, CreateReportDTO, CreateReviewReportDTO, CreateSpaceReportDTO, ReportDTO } from './dto';
import { CreateQnAAnswerReportDTO } from './dto/create-qna-answer-report.dto';
import { CreateReviewAnswerReportDTO } from './dto/create-review-answer-report.dto';
import { REPORT_ERROR_CODE } from './exception/errorCode';
import { ReportException } from './exception/report.exception';
import { ReportRepository } from './report.repository';

@Injectable()
export class ReportService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly spaceRepository: SpaceRepository,
    private readonly reviewRepository: ReviewRepository,
    private readonly qnaRepository: QnARepository
  ) {}

  async findReport(id: string) {
    const report = await this.reportRepository.findReport(id, {
      deletedAt: null,
    });
    return report;
  }

  async findReportPagingReports(paging: PagingDTO, userId: string, args = {} as Prisma.UserReportFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.reportRepository.countReports({
      where: {
        ...args.where,
        userId,
        deletedAt: null,
      },
    });
    const reports = await this.reportRepository.findReports(
      {
        ...args,
        where: {
          ...args.where,
          userId,
          deletedAt: null,
        },
        skip,
        take,
      },
      {
        deletedAt: null,
      }
    );

    return new PaginationDTO<ReportDTO>(reports, { count, paging });
  }

  async createSpaceReport(userId: string, data: CreateSpaceReportDTO) {
    await this.spaceRepository.findSpace(data.spaceId);
    const report = await this.reportRepository.checkReport({
      where: {
        userId,
        spaceId: data.spaceId,
        deletedAt: null,
      },
    });

    if (report) {
      throw new ReportException(REPORT_ERROR_CODE.REPORT_ALREADY_EXISTS);
    }

    return await this.reportRepository.createReport(userId, new CreateReportDTO(data));
  }

  async createReviewReport(userId: string, data: CreateReviewReportDTO) {
    await this.reviewRepository.findReview(data.reviewId);
    const report = await this.reportRepository.checkReport({
      where: {
        userId,
        spaceReviewId: data.reviewId,
        deletedAt: null,
      },
    });

    if (report) {
      throw new ReportException(REPORT_ERROR_CODE.REPORT_ALREADY_EXISTS);
    }

    return await this.reportRepository.createReport(userId, new CreateReportDTO(data));
  }

  async createReviewAnswerReport(userId: string, data: CreateReviewAnswerReportDTO) {
    await this.reviewRepository.findReviewAnswer(data.reviewAnswerId);

    const report = await this.reportRepository.checkReport({
      where: {
        userId,
        spaceReviewAnswerId: data.reviewAnswerId,
        deletedAt: null,
      },
    });

    if (report) {
      throw new ReportException(REPORT_ERROR_CODE.REPORT_ALREADY_EXISTS);
    }

    return await this.reportRepository.createReport(userId, new CreateReportDTO(data));
  }

  async createQnAReport(userId: string, data: CreateQnAReportDTO) {
    await this.qnaRepository.findQnA(data.qnaId);
    const report = await this.reportRepository.checkReport({
      where: {
        userId,
        spaceQnAId: data.qnaId,
        deletedAt: null,
      },
    });

    if (report) {
      throw new ReportException(REPORT_ERROR_CODE.REPORT_ALREADY_EXISTS);
    }

    return await this.reportRepository.createReport(userId, new CreateReportDTO(data));
  }

  async createQnAAnswerReport(userId: string, data: CreateQnAAnswerReportDTO) {
    await this.qnaRepository.findQnAAnswer(data.qnaAnswerId);
    const report = await this.reportRepository.checkReport({
      where: {
        userId,
        spaceQnAAnswerId: data.qnaAnswerId,
        deletedAt: null,
      },
    });

    if (report) {
      throw new ReportException(REPORT_ERROR_CODE.REPORT_ALREADY_EXISTS);
    }

    return await this.reportRepository.createReport(userId, new CreateReportDTO(data));
  }
}
