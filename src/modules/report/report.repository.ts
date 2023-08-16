import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { SpaceDTO } from '../space/dto';

import {
  CreateReportAnswerDTO,
  CreateReportDTO,
  ReportAnswerDTO,
  ReportDetailDTO,
  ReportDTO,
  UpdateReportAnswerDTO,
  UpdateReportDTO,
} from './dto';
import { REPORT_ANSWER_NOT_FOUND, REPORT_ERROR_CODE } from './exception/errorCode';
import { ReportException } from './exception/report.exception';

@Injectable()
export class ReportRepository {
  constructor(private readonly database: PrismaService) {}
}
