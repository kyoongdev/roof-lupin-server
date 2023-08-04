import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { SpaceRepository } from '../space/space.repository';
import { UserRepository } from '../user/user.repository';
import { CreateReportDTO, ReportDTO, UpdateReportDTO } from './dto';
import { ReportRepository } from './report.repository';
export declare class ReportService {
    private readonly reportRepository;
    private readonly spaceRepository;
    private readonly userRepository;
    constructor(reportRepository: ReportRepository, spaceRepository: SpaceRepository, userRepository: UserRepository);
    findReport(id: string): Promise<import("./dto").ReportDetailDTO>;
    findPagingReport(paging: PagingDTO, args?: Prisma.SpaceReportFindManyArgs): Promise<PaginationDTO<ReportDTO>>;
    findReports(args?: Prisma.SpaceReportFindManyArgs): Promise<ReportDTO[]>;
    createReports(userId: string, data: CreateReportDTO): Promise<string>;
    updateReport(reportId: string, userId: string, data: UpdateReportDTO): Promise<void>;
    deleteReport(reportId: string, userId: string): Promise<void>;
    checkIsUserValid(reportId: string, userId: string): Promise<void>;
}
