import { Injectable } from '@nestjs/common';

import { QnARepository } from '@/modules/qna/qna.repository';
import { REPORT_ERROR_CODE } from '@/modules/report/exception/errorCode';
import { ReportException } from '@/modules/report/exception/report.exception';
import { ReportRepository } from '@/modules/report/report.repository';
import { ReviewRepository } from '@/modules/review/review.repository';

import { HostCreateQnAReportDTO, HostCreateReportDTO, HostCreateReviewReportDTO } from '../dto/report';

import { HostReportRepository } from './report.repository';

@Injectable()
export class HostReportService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly qnaRepository: QnARepository,
    private readonly reportRepository: HostReportRepository
  ) {}

  async createReviewReport(userId: string, data: HostCreateReviewReportDTO) {
    await this.reviewRepository.findReview(data.spaceReviewId);
    const report = await this.reportRepository.checkReport({
      where: {
        spaceReviewId: data.spaceReviewId,
        deletedAt: null,
        hostId: userId,
      },
    });

    if (report) {
      throw new ReportException(REPORT_ERROR_CODE.REPORT_ALREADY_EXISTS);
    }
    return await this.reportRepository.createReport(userId, new HostCreateReportDTO(data));
  }

  async createQnAReport(userId: string, data: HostCreateQnAReportDTO) {
    await this.qnaRepository.findQnA(data.spaceQnAId);
    const report = await this.reportRepository.checkReport({
      where: {
        hostId: userId,
        spaceQnAId: data.spaceQnAId,
        deletedAt: null,
      },
    });

    if (report) {
      throw new ReportException(REPORT_ERROR_CODE.REPORT_ALREADY_EXISTS);
    }
    return await this.reportRepository.createReport(userId, new HostCreateReportDTO(data));
  }
}
