import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { FCMEvent } from '@/event/fcm';
import { CreateReportAnswerDTO, ReportDTO, UpdateReportAnswerDTO } from '@/modules/report/dto';
import { ReportRepository } from '@/modules/report/report.repository';
import { AdminUpdateReportDTO } from '../dto/report';
import { AdminUserRepository } from '../user/user.repository';
export declare class AdminReportService {
    private readonly reportRepository;
    private readonly fcmEvent;
    private readonly userRepository;
    constructor(reportRepository: ReportRepository, fcmEvent: FCMEvent, userRepository: AdminUserRepository);
    findReport(reportId: string): Promise<import("@/modules/report/dto").ReportDetailDTO>;
    findPagingReports(paging: PagingDTO, args?: Prisma.SpaceReportFindManyArgs): Promise<PaginationDTO<ReportDTO>>;
    updateReportStatus(id: string, data: AdminUpdateReportDTO): Promise<void>;
    createReportAnswer(adminId: string, reportId: string, data: CreateReportAnswerDTO): Promise<string>;
    updateReportAnswer(id: string, adminId: string, data: UpdateReportAnswerDTO): Promise<void>;
    deleteReport(id: string): Promise<void>;
    deleteReportAnswer(id: string, adminId: string): Promise<void>;
}
