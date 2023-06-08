import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { REVIEW_MUTATION_FORBIDDEN } from '../review/exception/errorCode';
import { SpaceRepository } from '../space/space.repository';
import { UserRepository } from '../user/user.repository';

import { CreateReportDTO, ReportDTO, UpdateReportDTO } from './dto';
import { REPORT_ALREADY_EXISTS, REPORT_ERROR_CODE } from './exception/errorCode';
import { ReportException } from './exception/report.exception';
import { ReportRepository } from './report.repository';

@Injectable()
export class ReportService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly spaceRepository: SpaceRepository,
    private readonly userRepository: UserRepository
  ) {}

  async findReport(id: string) {
    return await this.reportRepository.findReport(id);
  }

  async findPagingReport(paging: PagingDTO, args = {} as Prisma.SpaceReportFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.reportRepository.countReports({
      where: args.where,
    });
    const reports = await this.reportRepository.findReports({
      where: args.where,
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
      skip,
      take,
    });
    return new PaginationDTO<ReportDTO>(reports, { paging, count });
  }

  async findReports(args = {} as Prisma.SpaceReportFindManyArgs) {
    const reports = await this.reportRepository.findReports({
      where: args.where,
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
    });

    return reports;
  }

  async createReports(userId: string, data: CreateReportDTO) {
    await this.spaceRepository.findSpace(data.spaceId);
    const isExist = await this.reportRepository.checkUserReportBySpaceId(data.spaceId, userId);

    if (isExist) {
      throw new ReportException(REPORT_ERROR_CODE.CONFLICT(REPORT_ALREADY_EXISTS));
    }

    return await this.reportRepository.createReport(userId, data);
  }

  async updateReport(reportId: string, userId: string, data: UpdateReportDTO) {
    await this.checkIsUserValid(reportId, userId);

    //TODO: 이미 처리된 신고는 수정할 수 없음. -> 정책 필요

    await this.reportRepository.updateReport(reportId, data);
  }

  async deleteReport(reportId: string, userId: string) {
    await this.checkIsUserValid(reportId, userId);
    //TODO: 이미 처리된 신고는 신고할 수 없음. -> 정책 필요
    await this.reportRepository.deleteReport(reportId);
  }

  async checkIsUserValid(reportId: string, userId: string) {
    const report = await this.reportRepository.findReport(reportId);

    if (report.user.id !== userId) {
      throw new ReportException(REPORT_ERROR_CODE.FORBIDDEN(REVIEW_MUTATION_FORBIDDEN));
    }
  }
}
