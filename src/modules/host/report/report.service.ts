import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { ReportDTO } from '@/modules/report/dto';
import { ReportRepository } from '@/modules/report/report.repository';

@Injectable()
export class HostReportService {
  constructor(private readonly reportRepository: ReportRepository) {}
}
