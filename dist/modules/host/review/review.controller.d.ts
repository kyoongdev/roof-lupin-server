import { PagingDTO } from 'cumuco-nestjs';
import { RequestHost } from '@/interface/role.interface';
import { ReviewDTO } from '@/modules/review/dto/review.dto';
import { HostReviewService } from './review.service';
export declare class HostReviewController {
    private readonly reviewService;
    constructor(reviewService: HostReviewService);
    getReview(reviewId: string): Promise<void>;
    getReviewsBySpaceID(paging: PagingDTO, spaceId: string, user: RequestHost): Promise<import("cumuco-nestjs").PaginationDTO<ReviewDTO>>;
    getReviews(paging: PagingDTO, user: RequestHost): Promise<import("cumuco-nestjs").PaginationDTO<ReviewDTO>>;
    setBestReview(reviewId: string): Promise<void>;
    deleteBestReview(reviewId: string): Promise<void>;
}
