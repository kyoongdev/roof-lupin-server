import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { FileService } from '../file/file.service';
import { ReservationRepository } from '../reservation/reservation.repository';
import { SpaceRepository } from '../space/space.repository';
import { CreateReviewReportDTO, ReviewsSummaryDTO, UpdateReviewDTO, UpdateReviewReportDTO } from './dto';
import { CreateReviewDTO } from './dto/create-review.dto';
import { ReviewDTO } from './dto/review.dto';
import { ReviewRepository } from './review.repository';
export declare class ReviewService {
    private readonly reviewRepository;
    private readonly spaceRepository;
    private readonly reservationRepository;
    private readonly fileService;
    constructor(reviewRepository: ReviewRepository, spaceRepository: SpaceRepository, reservationRepository: ReservationRepository, fileService: FileService);
    getReviewSummary(spaceId: string): Promise<ReviewsSummaryDTO>;
    findReview(id: string): Promise<ReviewDTO>;
    findReviews(args?: Prisma.SpaceReviewFindManyArgs): Promise<ReviewDTO[]>;
    findPagingReviews(paging: PagingDTO, args?: Prisma.SpaceReviewFindManyArgs): Promise<PaginationDTO<ReviewDTO>>;
    createReview(props: CreateReviewDTO, userId: string): Promise<string>;
    updateReview(reviewId: string, userId: string, props: UpdateReviewDTO): Promise<void>;
    deleteReview(reviewId: string, userId: string): Promise<void>;
    checkIsUserValid(reviewId: string, userId: string): Promise<void>;
    createReviewReport(reviewId: string, userId: string, data: CreateReviewReportDTO): Promise<void>;
    updateReviewReport(id: string, userId: string, data: UpdateReviewReportDTO): Promise<void>;
    deleteReviewReport(id: string, userId: string): Promise<void>;
}
