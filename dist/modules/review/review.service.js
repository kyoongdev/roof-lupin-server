"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const date_1 = require("../../common/date");
const file_service_1 = require("../file/file.service");
const reservation_repository_1 = require("../reservation/reservation.repository");
const space_repository_1 = require("../space/space.repository");
const dto_1 = require("./dto");
const errorCode_1 = require("./exception/errorCode");
const review_exception_1 = require("./exception/review.exception");
const review_repository_1 = require("./review.repository");
let ReviewService = class ReviewService {
    constructor(reviewRepository, spaceRepository, reservationRepository, fileService) {
        this.reviewRepository = reviewRepository;
        this.spaceRepository = spaceRepository;
        this.reservationRepository = reservationRepository;
        this.fileService = fileService;
    }
    async getReviewSummary(spaceId) {
        const score = await this.reviewRepository.getReviewAverageScore(spaceId);
        const count = await this.reviewRepository.countReviews({ where: { spaceId } });
        return new dto_1.ReviewsSummaryDTO({ averageScore: score || 0, count });
    }
    async findReview(id) {
        const review = await this.reviewRepository.findReview(id);
        return review;
    }
    async findReviews(args = {}) {
        return await this.reviewRepository.findReviews({
            where: {
                ...args.where,
            },
            orderBy: {
                createdAt: 'desc',
                ...args.orderBy,
            },
        });
    }
    async findPagingReviews(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.reviewRepository.countReviews({
            where: args.where,
            orderBy: [
                {
                    createdAt: 'desc',
                },
                {
                    isBest: 'asc',
                },
                {
                    ...(args.orderBy ? args.orderBy : { createdAt: 'desc' }),
                },
            ],
        });
        const rows = await this.reviewRepository.findReviews({
            where: args.where,
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(rows, { count, paging });
    }
    async createReview(props, userId) {
        const reservation = await this.reservationRepository.findReservation(props.reservationId);
        const { score, spaceId } = props;
        const reservationDate = new Date(Number(reservation.year), Number(reservation.month) - 1, Number(reservation.day), 9);
        const currentDate = new Date();
        if (reservation.isReviewed) {
            throw new review_exception_1.ReviewException(errorCode_1.REVIEW_ERROR_CODE.CONFLICT(errorCode_1.REVIEW_ALREADY_EXISTS));
        }
        if ((0, date_1.getDateDiff)(reservationDate, currentDate) > 14) {
            throw new review_exception_1.ReviewException(errorCode_1.REVIEW_ERROR_CODE.BAD_REQUEST(errorCode_1.REVIEW_WRITE_DUE_DATE));
        }
        if (reservation.space.id !== props.spaceId) {
            throw new review_exception_1.ReviewException(errorCode_1.REVIEW_ERROR_CODE.BAD_REQUEST(errorCode_1.REVIEW_SPACE_BAD_REQUEST));
        }
        if (score < 1 || score > 5) {
            throw new review_exception_1.ReviewException(errorCode_1.REVIEW_ERROR_CODE.BAD_REQUEST(errorCode_1.SCORE_BAD_REQUEST));
        }
        if (props.images.length > 3) {
            throw new review_exception_1.ReviewException(errorCode_1.REVIEW_ERROR_CODE.BAD_REQUEST(errorCode_1.REVIEW_IMAGE_LENGTH_EXCEEDED));
        }
        await this.spaceRepository.findSpace(spaceId);
        return await this.reviewRepository.createReview(props, userId);
    }
    async updateReview(reviewId, userId, props) {
        const review = await this.findReview(reviewId);
        const reservation = await this.reservationRepository.findReservation(review.reservationId);
        const currentDate = new Date();
        const reviewedAt = reservation.createdAt;
        if ((0, date_1.getTimeDiff)(currentDate, reviewedAt) > 72) {
            throw new review_exception_1.ReviewException(errorCode_1.REVIEW_ERROR_CODE.BAD_REQUEST(errorCode_1.REVIEW_UPDATE_DUE_DATE));
        }
        await this.checkIsUserValid(reviewId, userId);
        if (props.images) {
            await Promise.all(props.images.map(async (image) => {
                await this.fileService.deleteFile(image);
            }));
        }
        await this.reviewRepository.updateReview(reviewId, props);
    }
    async deleteReview(reviewId, userId) {
        const review = await this.findReview(reviewId);
        await this.checkIsUserValid(reviewId, userId);
        if (review.images) {
            await Promise.all(review.images.map(async (image) => {
                await this.fileService.deleteFile(image.url);
            }));
        }
        await this.reviewRepository.deleteReview(reviewId);
    }
    async checkIsUserValid(reviewId, userId) {
        const review = await this.reviewRepository.findReview(reviewId);
        if (review.user.id !== userId) {
            throw new review_exception_1.ReviewException(errorCode_1.REVIEW_ERROR_CODE.BAD_REQUEST(errorCode_1.REVIEW_MUTATION_FORBIDDEN));
        }
    }
    async createReviewReport(reviewId, userId, data) {
        const isExist = await this.reviewRepository.checkReviewReport(reviewId, userId);
        if (isExist) {
            throw new review_exception_1.ReviewException(errorCode_1.REVIEW_ERROR_CODE.CONFLICT(errorCode_1.REVIEW_REPORT_ALREADY_EXISTS));
        }
        return await this.reviewRepository.createReviewReport(reviewId, userId, data);
    }
    async updateReviewReport(id, userId, data) {
        const report = await this.reviewRepository.findReviewReport(id);
        if (report.user.id !== userId) {
            throw new review_exception_1.ReviewException(errorCode_1.REVIEW_ERROR_CODE.FORBIDDEN(errorCode_1.REVIEW_REPORT_MUTATION_FORBIDDEN));
        }
        await this.reviewRepository.updateReviewReport(id, data);
    }
    async deleteReviewReport(id, userId) {
        const report = await this.reviewRepository.findReviewReport(id);
        if (report.user.id !== userId) {
            throw new review_exception_1.ReviewException(errorCode_1.REVIEW_ERROR_CODE.FORBIDDEN(errorCode_1.REVIEW_REPORT_MUTATION_FORBIDDEN));
        }
        await this.reviewRepository.deleteReviewReport(id);
    }
};
ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [review_repository_1.ReviewRepository,
        space_repository_1.SpaceRepository,
        reservation_repository_1.ReservationRepository,
        file_service_1.FileService])
], ReviewService);
exports.ReviewService = ReviewService;
//# sourceMappingURL=review.service.js.map