import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

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
}
