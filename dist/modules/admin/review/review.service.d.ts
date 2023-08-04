import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { PrismaService } from '@/database/prisma.service';
import { ReviewReportDTO } from '@/modules/review/dto';
import { ReviewRepository } from '@/modules/review/review.repository';
export declare class AdminReviewService {
    private readonly reviewRepository;
    private readonly database;
    constructor(reviewRepository: ReviewRepository, database: PrismaService);
    findReview(id: string): Promise<import("@/modules/review/dto").ReviewDTO>;
    findPagingReviews(paging: PagingDTO, args?: Prisma.SpaceReviewFindManyArgs): Promise<PaginationDTO<import("@/modules/review/dto").ReviewDTO>>;
    setIsBestReview(id: string, isBest: boolean): Promise<void>;
    findPagingReviewReports(paging: PagingDTO, args?: Prisma.SpaceReviewReportFindManyArgs): Promise<PaginationDTO<ReviewReportDTO>>;
    updateReviewReportIsProcessed(id: string, isProcessed: boolean): Promise<void>;
    deleteReview(id: string): Promise<void>;
}
