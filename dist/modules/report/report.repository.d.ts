import type { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { CreateReportAnswerDTO, CreateReportDTO, ReportAnswerDTO, ReportDetailDTO, ReportDTO, UpdateReportAnswerDTO, UpdateReportDTO } from './dto';
export declare class ReportRepository {
    private readonly database;
    constructor(database: PrismaService);
    countReports(args?: Prisma.SpaceReportCountArgs): Promise<number>;
    findReports(args?: Prisma.SpaceReportFindManyArgs): Promise<ReportDTO[]>;
    findReport(id: string): Promise<ReportDetailDTO>;
    checkUserReportBySpaceId(spaceId: string, userId: string): Promise<ReportDTO>;
    createReport(userId: string, data: CreateReportDTO): Promise<string>;
    updateReport(id: string, data: UpdateReportDTO): Promise<void>;
    updateReportStatus(id: string, status: number): Promise<void>;
    deleteReport(id: string): Promise<void>;
    findReportAnswer(id: string): Promise<ReportAnswerDTO>;
    createReportAnswer(adminId: string, reportId: string, data: CreateReportAnswerDTO): Promise<string>;
    updateReportAnswer(id: string, data: UpdateReportAnswerDTO): Promise<void>;
    deleteReportAnswer(id: string): Promise<void>;
}
