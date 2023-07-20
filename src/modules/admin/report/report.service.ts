import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { CreateReportAnswerDTO, ReportDTO, UpdateReportAnswerDTO } from '@/modules/report/dto';
import { REPORT_ANSWER_MUTATION_FORBIDDEN, REPORT_ERROR_CODE } from '@/modules/report/exception/errorCode';
import { ReportException } from '@/modules/report/exception/report.exception';
import { ReportRepository } from '@/modules/report/report.repository';

import { AdminUpdateReportDTO } from '../dto/report';

@Injectable()
export class AdminReportService {
  constructor(private readonly reportRepository: ReportRepository) {}

  async findReport(reportId: string) {
    return await this.reportRepository.findReport(reportId);
  }

  async findPagingReports(paging: PagingDTO, args = {} as Prisma.SpaceReportFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.reportRepository.countReports({
      where: args.where,
    });
    const reports = await this.reportRepository.findReports({
      where: args.where,
      skip,
      take,
    });

    return new PaginationDTO<ReportDTO>(reports, { count, paging });
  }

  async updateReportStatus(id: string, data: AdminUpdateReportDTO) {
    await this.reportRepository.updateReportStatus(id, data.reportStatus);
  }

  async createReportAnswer(adminId: string, reportId: string, data: CreateReportAnswerDTO) {
    return await this.reportRepository.createReportAnswer(adminId, reportId, data);
  }

  async updateReportAnswer(id: string, adminId: string, data: UpdateReportAnswerDTO) {
    const reportAnswer = await this.reportRepository.findReportAnswer(id);

    if (reportAnswer.admin.id !== adminId) {
      throw new ReportException(REPORT_ERROR_CODE.FORBIDDEN(REPORT_ANSWER_MUTATION_FORBIDDEN));
    }

    await this.reportRepository.updateReportAnswer(id, data);
  }

  async deleteReportAnswer(id: string, adminId: string) {
    const reportAnswer = await this.reportRepository.findReportAnswer(id);

    if (reportAnswer.admin.id !== adminId) {
      throw new ReportException(REPORT_ERROR_CODE.FORBIDDEN(REPORT_ANSWER_MUTATION_FORBIDDEN));
    }

    await this.reportRepository.deleteReportAnswer(id);
  }
}
