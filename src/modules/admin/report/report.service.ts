import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { FCMEvent } from '@/event/fcm';
import { CreateReportAnswerDTO, ReportDTO, UpdateReportAnswerDTO } from '@/modules/report/dto';
import { REPORT_ANSWER_MUTATION_FORBIDDEN, REPORT_ERROR_CODE } from '@/modules/report/exception/errorCode';
import { ReportException } from '@/modules/report/exception/report.exception';
import { ReportRepository } from '@/modules/report/report.repository';

import { AdminUpdateReportDTO } from '../dto/report';
import { AdminUserRepository } from '../user/user.repository';

@Injectable()
export class AdminReportService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly fcmEvent: FCMEvent,
    private readonly userRepository: AdminUserRepository
  ) {}

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
    const report = await this.reportRepository.findReport(reportId);

    const answerId = await this.reportRepository.createReportAnswer(adminId, reportId, data);

    const user = await this.userRepository.findUser(report.user.id);

    if (user.pushToken && user.isAlarmAccepted) {
      this.fcmEvent.sendAlarm(
        {
          pushToken: user.pushToken,
          userId: user.id,
        },
        { title: '신고가 아래와 같이 조치가 완료됐습니다..', body: data.content }
      );
    }

    return answerId;
  }

  async updateReportAnswer(id: string, adminId: string, data: UpdateReportAnswerDTO) {
    const reportAnswer = await this.reportRepository.findReportAnswer(id);

    if (reportAnswer.admin.id !== adminId) {
      throw new ReportException(REPORT_ERROR_CODE.FORBIDDEN(REPORT_ANSWER_MUTATION_FORBIDDEN));
    }

    await this.reportRepository.updateReportAnswer(id, data);
  }

  async deleteReport(id: string) {
    await this.findReport(id);
    await this.reportRepository.deleteReport(id);
  }

  async deleteReportAnswer(id: string, adminId: string) {
    const reportAnswer = await this.reportRepository.findReportAnswer(id);

    if (reportAnswer.admin.id !== adminId) {
      throw new ReportException(REPORT_ERROR_CODE.FORBIDDEN(REPORT_ANSWER_MUTATION_FORBIDDEN));
    }

    await this.reportRepository.deleteReportAnswer(id);
  }
}
