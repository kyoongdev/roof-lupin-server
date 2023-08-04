import { PagingDTO } from 'cumuco-nestjs';
import { ReviewDTO, ReviewReportDTO } from '@/modules/review/dto';
import { AdminFindReviewsQuery } from '../dto/query/review/find-reviews.query';
import { AdminReviewService } from './review.service';
export declare class AdminReviewController {
    private readonly reviewService;
    constructor(reviewService: AdminReviewService);
    getReview(reviewId: string): Promise<ReviewDTO>;
    getReviews(paging: PagingDTO, query: AdminFindReviewsQuery): Promise<import("cumuco-nestjs").PaginationDTO<ReviewDTO>>;
    getReviewReports(paging: PagingDTO): Promise<import("cumuco-nestjs").PaginationDTO<ReviewReportDTO>>;
    setBestReview(reviewId: string): Promise<void>;
    processReviewReport(reportId: string): Promise<void>;
    unProcessReviewReport(reportId: string): Promise<void>;
    deleteBestReview(reviewId: string): Promise<void>;
    deleteReview(id: string): Promise<void>;
}
