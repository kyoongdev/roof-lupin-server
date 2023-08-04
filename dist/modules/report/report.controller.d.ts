import { PagingDTO } from 'cumuco-nestjs';
import { RequestUser } from '@/interface/role.interface';
import { CreateReportDTO, ReportDTO, UpdateReportDTO } from './dto';
import { ReportService } from './report.service';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    getMyReports(paging: PagingDTO): Promise<import("cumuco-nestjs").PaginationDTO<ReportDTO>>;
    createReport(user: RequestUser, body: CreateReportDTO): Promise<string>;
    updateReport(reportId: string, user: RequestUser, body: UpdateReportDTO): Promise<void>;
    deleteReport(reportId: string, user: RequestUser): Promise<void>;
}
