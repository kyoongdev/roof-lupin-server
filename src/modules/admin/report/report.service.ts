import { ConflictException, Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { CreateReportAnswerDTO, ReportDTO, UpdateReportDTO } from '@/modules/report/dto';
import { UpdateReportAnswerDTO } from '@/modules/report/dto/update-report-answer.dto';
import { REPORT_ANSWER_ALREADY_EXISTS } from '@/modules/report/exception/errorCode';
import { ReportRepository } from '@/modules/report/report.repository';

@Injectable()
export class AdminReportService {
  constructor(private readonly reportRepository: ReportRepository) {}

  async findReport(id: string) {
    return await this.reportRepository.findReport(id);
  }

  async findPagingReport(paging: PagingDTO, args = {} as Prisma.UserReportFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.reportRepository.countReports({
      where: {
        ...args.where,
      },
    });
    const reports = await this.reportRepository.findReports(
      {
        ...args,
        skip,
        take,
      },
      {
        deletedAt: null,
      }
    );

    return new PaginationDTO<ReportDTO>(reports, { count, paging });
  }

  async updateReport(reportId: string, data: UpdateReportDTO) {
    await this.reportRepository.findReport(reportId);

    await this.reportRepository.updateReport(reportId, data);
  }

  async createReportAnswer(reportId: string, adminId: string, data: CreateReportAnswerDTO) {
    const isExist = await this.reportRepository.checkReportAnswer({
      where: {
        reportId,
        adminId,
        deletedAt: null,
      },
    });

    if (isExist) {
      throw new ConflictException(REPORT_ANSWER_ALREADY_EXISTS);
    }

    return await this.reportRepository.createReportAnswer(reportId, adminId, data);
  }

  async updateReportAnswer(reportAnswerId: string, data: UpdateReportAnswerDTO) {
    await this.reportRepository.findReportAnswer(reportAnswerId);

    await this.reportRepository.updateReportAnswer(reportAnswerId, data);
  }

  async deleteReportAnswer(reportAnswerId: string) {
    await this.reportRepository.findReportAnswer(reportAnswerId);
    await this.reportRepository.deleteReportAnswer(reportAnswerId);
  }
}
