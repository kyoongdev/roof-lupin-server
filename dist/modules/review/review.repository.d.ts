import { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { BestPhotoDTO, CreateReviewDTO, CreateReviewReportDTO, ReviewReportDTO, UpdateReviewDTO, UpdateReviewReportDTO } from './dto';
import { ReviewDTO } from './dto/review.dto';
export declare class ReviewRepository {
    private readonly database;
    constructor(database: PrismaService);
    findReview(id: string): Promise<ReviewDTO>;
    countReviews(args?: Prisma.SpaceReviewCountArgs): Promise<number>;
    getReviewAverageScore(spaceId: string): Promise<number>;
    findReviews(args?: Prisma.SpaceReviewFindManyArgs): Promise<ReviewDTO[]>;
    findBestPhotoReviews(spaceId: string): Promise<BestPhotoDTO[]>;
    findReviewReport(id: string): Promise<ReviewReportDTO>;
    checkReviewReport(reviewId: string, userId: string): Promise<import(".prisma/client").SpaceReviewReport>;
    countReviewReports(args?: Prisma.SpaceReviewReportCountArgs): Promise<number>;
    findReviewReports(args?: Prisma.SpaceReviewReportFindManyArgs): Promise<ReviewReportDTO[]>;
    createReviewReport(reviewId: string, userId: string, data: CreateReviewReportDTO): Promise<void>;
    updateReviewReport(id: string, data: UpdateReviewReportDTO): Promise<void>;
    updateReviewReportIsProcessed(id: string, isProcessed: boolean): Promise<void>;
    deleteReviewReport(id: string): Promise<void>;
    createReview(props: CreateReviewDTO, userId: string): Promise<string>;
    updateReview(id: string, props: UpdateReviewDTO): Promise<void>;
    deleteReview(id: string): Promise<void>;
}
