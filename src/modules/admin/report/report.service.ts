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
}
