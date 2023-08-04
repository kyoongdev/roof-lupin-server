import { PagingDTO } from 'cumuco-nestjs';
import { RequestUser } from '@/interface/role.interface';
import { CreateReviewReportDTO, ReviewsSummaryDTO, UpdateReviewDTO, UpdateReviewReportDTO } from './dto';
import { CreateReviewDTO } from './dto/create-review.dto';
import { FindReviewsQuery } from './dto/query';
import { ReviewDTO } from './dto/review.dto';
import { ReviewService } from './review.service';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    getReviewSummary(spaceId: string): Promise<ReviewsSummaryDTO>;
    getPagingSpaceReviews(spaceId: string, paging: PagingDTO, query: FindReviewsQuery): Promise<import("cumuco-nestjs").PaginationDTO<ReviewDTO>>;
    getSpaceReviews(spaceId: string): Promise<ReviewDTO[]>;
    getSpaceBestReviews(spaceId: string): Promise<ReviewDTO[]>;
    getMyReviews(user: RequestUser): Promise<ReviewDTO[]>;
    getMyReviewsPaging(paging: PagingDTO, user: RequestUser): Promise<import("cumuco-nestjs").PaginationDTO<ReviewDTO>>;
    getReview(reviewId: string): Promise<ReviewDTO>;
    createReview(body: CreateReviewDTO, user: RequestUser): Promise<string>;
    createReviewReport(id: string, user: RequestUser, body: CreateReviewReportDTO): Promise<void>;
    updateReviewReport(reportId: string, user: RequestUser, body: UpdateReviewReportDTO): Promise<void>;
    updateReview(body: UpdateReviewDTO, reviewId: string, user: RequestUser): Promise<void>;
    deleteReview(reviewId: string, user: RequestUser): Promise<void>;
    deleteReviewReport(reportId: string, user: RequestUser): Promise<void>;
}
