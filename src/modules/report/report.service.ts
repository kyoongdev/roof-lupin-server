import { ConflictException, Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { QnARepository } from '../qna/qna.repository';
import { ReviewRepository } from '../review/review.repository';
import { SpaceRepository } from '../space/space.repository';
import { UserRepository } from '../user/user.repository';

import { CreateQnAReportDTO, CreateReviewReportDTO, CreateSpaceReportDTO, ReportDTO } from './dto';
import { REPORT_ALREADY_EXISTS } from './exception/errorCode';
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
    const report = await this.reportRepository.findReport(id);
    return report;
  }

  async findReportPagingReports(paging: PagingDTO, userId: string, args = {} as Prisma.UserReportFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.reportRepository.countReports({
      where: {
        userId,
        ...args.where,
      },
    });
    const reports = await this.reportRepository.findReports({
      ...args,
      skip,
      take,
    });

    return new PaginationDTO<ReportDTO>(reports, { count, paging });
  }

  async createSpaceReport(userId: string, data: CreateSpaceReportDTO) {
    await this.spaceRepository.findSpace(data.spaceId);
    const report = await this.reportRepository.checkReport({
      where: {
        userId,
        spaceId: data.spaceId,
      },
    });

    if (report) {
      throw new ConflictException(REPORT_ALREADY_EXISTS);
    }

    return await this.reportRepository.createReport(userId, data);
  }

  async createReviewReport(userId: string, data: CreateReviewReportDTO) {
    await this.reviewRepository.findReview(data.reviewId);
    const report = await this.reportRepository.checkReport({
      where: {
        userId,
        spaceReviewId: data.reviewId,
      },
    });

    if (report) {
      throw new ConflictException(REPORT_ALREADY_EXISTS);
    }

    return await this.reportRepository.createReport(userId, data);
  }

  async createQnAReport(userId: string, data: CreateQnAReportDTO) {
    await this.qnaRepository.findQnA(data.qnaId);
    const report = await this.reportRepository.checkReport({
      where: {
        userId,
        spaceQnAId: data.qnaId,
      },
    });

    if (report) {
      throw new ConflictException(REPORT_ALREADY_EXISTS);
    }

    return await this.reportRepository.createReport(userId, data);
  }
}
