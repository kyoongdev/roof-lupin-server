import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { ReportDTO } from '@/modules/report/dto';
import { ReportRepository } from '@/modules/report/report.repository';
export declare class HostReportService {
    private readonly reportRepository;
    constructor(reportRepository: ReportRepository);
    findReport(id: string): Promise<import("@/modules/report/dto").ReportDetailDTO>;
    findPagingReports(paging: PagingDTO, args?: Prisma.SpaceReportFindManyArgs): Promise<PaginationDTO<ReportDTO>>;
}
