import { PagingDTO } from 'cumuco-nestjs';
import { IdsDTO } from '@/common';
import { RequestAdmin } from '@/interface/role.interface';
import { CreateReportAnswerDTO, ReportDetailDTO, ReportDTO, UpdateReportAnswerDTO } from '@/modules/report/dto';
import { AdminFindReportsQuery } from '../dto/query/report';
import { AdminUpdateReportDTO } from '../dto/report';
import { AdminReportService } from './report.service';
export declare class AdminReportController {
    private readonly adminReportService;
    constructor(adminReportService: AdminReportService);
    getReport(reportId: string): Promise<ReportDetailDTO>;
    getReports(paging: PagingDTO, query: AdminFindReportsQuery): Promise<import("cumuco-nestjs").PaginationDTO<ReportDTO>>;
    updateReportStatus(reportId: string, body: AdminUpdateReportDTO): Promise<void>;
    createReportAnswer(user: RequestAdmin, reportId: string, body: CreateReportAnswerDTO): Promise<string>;
    updateReportAnswer(id: string, user: RequestAdmin, body: UpdateReportAnswerDTO): Promise<void>;
    deleteReportAnswer(id: string, user: RequestAdmin): Promise<void>;
    deleteReports(query: IdsDTO): Promise<void>;
}
