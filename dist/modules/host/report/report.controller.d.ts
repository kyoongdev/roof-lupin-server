import { PagingDTO } from 'cumuco-nestjs';
import { RequestHost } from '@/interface/role.interface';
import { ReportDTO } from '@/modules/report/dto';
import { HostReportService } from './report.service';
export declare class HostReportController {
    private readonly reportService;
    constructor(reportService: HostReportService);
    getReport(reportId: string): Promise<import("@/modules/report/dto").ReportDetailDTO>;
    getReportsBySpaceId(paging: PagingDTO, spaceId: string, user: RequestHost): Promise<import("cumuco-nestjs").PaginationDTO<ReportDTO>>;
    getReports(paging: PagingDTO, user: RequestHost): Promise<import("cumuco-nestjs").PaginationDTO<ReportDTO>>;
}
