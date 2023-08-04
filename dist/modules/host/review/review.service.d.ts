import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { ReviewDTO } from '@/modules/review/dto/review.dto';
import { ReviewRepository } from '@/modules/review/review.repository';
export declare class HostReviewService {
    private readonly reviewRepository;
    constructor(reviewRepository: ReviewRepository);
    findReview(id: string): Promise<ReviewDTO>;
    findPagingReviews(paging: PagingDTO, args?: Prisma.SpaceReviewFindManyArgs): Promise<PaginationDTO<ReviewDTO>>;
    setIsBestReview(id: string, isBest: boolean): Promise<void>;
}
