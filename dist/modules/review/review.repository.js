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
exports.ReviewRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("./dto");
const review_dto_1 = require("./dto/review.dto");
const errorCode_1 = require("./exception/errorCode");
const review_exception_1 = require("./exception/review.exception");
let ReviewRepository = class ReviewRepository {
    constructor(database) {
        this.database = database;
    }
    async findReview(id) {
        const review = await this.database.spaceReview.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
                images: {
                    select: {
                        image: {
                            select: {
                                id: true,
                                url: true,
                            },
                        },
                    },
                },
                answers: {
                    include: {
                        host: true,
                    },
                },
            },
        });
        if (!review) {
            throw new review_exception_1.ReviewException(errorCode_1.REVIEW_ERROR_CODE.NOT_FOUND());
        }
        return new review_dto_1.ReviewDTO(review);
    }
    async countReviews(args = {}) {
        return await this.database.spaceReview.count(args);
    }
    async getReviewAverageScore(spaceId) {
        const score = await this.database.spaceReview.aggregate({
            where: {
                spaceId,
            },
            _avg: {
                score: true,
            },
        });
        return score._avg.score;
    }
    async findReviews(args = {}) {
        const reviews = await this.database.spaceReview.findMany({
            where: {
                ...args.where,
            },
            include: {
                user: true,
                images: {
                    select: {
                        image: {
                            select: {
                                id: true,
                                url: true,
                            },
                        },
                    },
                },
                answers: {
                    include: {
                        host: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
                ...args.orderBy,
            },
            skip: args.skip,
            take: args.take,
        });
        return reviews.map((review) => new review_dto_1.ReviewDTO(review));
    }
    async findBestPhotoReviews(spaceId) {
        const photos = await this.database.spaceReviewImage.findMany({
            where: {
                spaceReview: {
                    isBest: true,
                    spaceId,
                },
            },
            include: {
                image: true,
            },
        });
        return photos.map((photo) => new dto_1.BestPhotoDTO({
            id: photo.image.id,
            url: photo.image.url,
        }));
    }
    async findReviewReport(id) {
        const report = await this.database.spaceReviewReport.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
            },
        });
        if (!report) {
            throw new review_exception_1.ReviewException(errorCode_1.REVIEW_ERROR_CODE.NOT_FOUND(errorCode_1.REVIEW_REPORT_NOT_FOUND));
        }
        return new dto_1.ReviewReportDTO(report);
    }
    async checkReviewReport(reviewId, userId) {
        const report = await this.database.spaceReviewReport.findFirst({
            where: {
                spaceReviewId: reviewId,
                userId,
            },
        });
        return report;
    }
    async countReviewReports(args = {}) {
        return await this.database.spaceReviewReport.count(args);
    }
    async findReviewReports(args = {}) {
        const reports = await this.database.spaceReviewReport.findMany({
            where: {
                ...args.where,
            },
            include: {
                user: true,
            },
            orderBy: {
                createdAt: 'desc',
                ...args.orderBy,
            },
            skip: args.skip,
            take: args.take,
        });
        return reports.map((report) => new dto_1.ReviewReportDTO(report));
    }
    async createReviewReport(reviewId, userId, data) {
        await this.database.spaceReviewReport.create({
            data: {
                ...data,
                spaceReview: {
                    connect: {
                        id: reviewId,
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }
    async updateReviewReport(id, data) {
        await this.database.spaceReviewReport.update({
            where: {
                id,
            },
            data,
        });
    }
    async updateReviewReportIsProcessed(id, isProcessed) {
        await this.database.spaceReviewReport.update({
            where: {
                id,
            },
            data: {
                isProcessed,
            },
        });
    }
    async deleteReviewReport(id) {
        await this.database.spaceReviewReport.delete({
            where: {
                id,
            },
        });
    }
    async createReview(props, userId) {
        const { content, score, spaceId, images } = props;
        const review = await this.database.spaceReview.create({
            data: {
                content,
                score,
                space: {
                    connect: {
                        id: spaceId,
                    },
                },
                images: {
                    create: images.map((url) => ({
                        image: {
                            create: {
                                url,
                            },
                        },
                    })),
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
                reservation: {
                    connect: {
                        id: props.reservationId,
                    },
                },
            },
        });
        return review.id;
    }
    async updateReview(id, props) {
        if (props.images) {
            await this.database.image.deleteMany({
                where: {
                    spaceReviewImages: {
                        some: {
                            spaceReviewId: id,
                        },
                    },
                },
            });
        }
        await this.database.spaceReview.update({
            where: {
                id,
            },
            data: {
                content: props.content,
                score: props.score,
                images: props.images && {
                    create: props.images.map((url) => ({
                        image: {
                            create: {
                                url,
                            },
                        },
                    })),
                },
            },
        });
    }
    async deleteReview(id) {
        await this.database.spaceReview.delete({
            where: {
                id,
            },
        });
    }
};
ReviewRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewRepository);
exports.ReviewRepository = ReviewRepository;
//# sourceMappingURL=review.repository.js.map