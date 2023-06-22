import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { ReservationRepository } from '../reservation/reservation.repository';
import { SpaceRepository } from '../space/space.repository';

import { CreateReviewReportDTO, ReviewsSummaryDTO, UpdateReviewDTO, UpdateReviewReportDTO } from './dto';
import { CreateReviewDTO } from './dto/create-review.dto';
import { ReviewDTO } from './dto/review.dto';
import {
  REVIEW_ERROR_CODE,
  REVIEW_IMAGE_LENGTH_EXCEEDED,
  REVIEW_MUTATION_FORBIDDEN,
  REVIEW_REPORT_ALREADY_EXISTS,
  REVIEW_REPORT_MUTATION_FORBIDDEN,
  REVIEW_SPACE_BAD_REQUEST,
  REVIEW_WRITE_DUE_DATE,
  SCORE_BAD_REQUEST,
} from './exception/errorCode';
import { ReviewException } from './exception/review.exception';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly spaceRepository: SpaceRepository,
    private readonly reservationRepository: ReservationRepository
  ) {}

  async getReviewSummary(spaceId: string) {
    const score = await this.reviewRepository.getReviewAverageScore(spaceId);
    const count = await this.reviewRepository.countReviews({ where: { spaceId } });
    return new ReviewsSummaryDTO({ averageScore: score, count });
  }

  async findReview(id: string) {
    const review = await this.reviewRepository.findReview(id);

    return review;
  }

  async findReviews(args = {} as Prisma.SpaceReviewFindManyArgs) {
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

  async findPagingReviews(paging: PagingDTO, args = {} as Prisma.SpaceReviewFindManyArgs) {
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
          ...(args.orderBy ? (args.orderBy as Prisma.SpaceReviewOrderByWithRelationInput) : { createdAt: 'desc' }),
        },
      ],
    });
    const rows = await this.reviewRepository.findReviews({
      where: args.where,
      skip,
      take,
    });

    return new PaginationDTO<ReviewDTO>(rows, { count, paging });
  }

  async createReview(props: CreateReviewDTO, userId: string) {
    const reservation = await this.reservationRepository.findReservation(props.reservationId);
    const { score, spaceId } = props;
    const reservationDate = new Date(
      Number(reservation.year),
      Number(reservation.month) - 1,
      Number(reservation.day),
      9
    ).getTime();
    const currentDate = new Date().getTime();
    const diffDate = currentDate - reservationDate;

    if (Math.abs(diffDate / (1000 * 60 * 60 * 24)) > 14) {
      throw new ReviewException(REVIEW_ERROR_CODE.BAD_REQUEST(REVIEW_WRITE_DUE_DATE));
    }

    if (reservation.space.id !== props.spaceId) {
      throw new ReviewException(REVIEW_ERROR_CODE.BAD_REQUEST(REVIEW_SPACE_BAD_REQUEST));
    }

    if (score < 1 || score > 5) {
      throw new ReviewException(REVIEW_ERROR_CODE.BAD_REQUEST(SCORE_BAD_REQUEST));
    }

    if (props.images.length > 3) {
      throw new ReviewException(REVIEW_ERROR_CODE.BAD_REQUEST(REVIEW_IMAGE_LENGTH_EXCEEDED));
    }

    await this.spaceRepository.findSpace(spaceId);
    return await this.reviewRepository.createReview(props, userId);
  }

  async updateReview(reviewId: string, userId: string, props: UpdateReviewDTO) {
    await this.findReview(reviewId);
    await this.checkIsUserValid(reviewId, userId);

    await this.reviewRepository.updateReview(reviewId, props);
  }

  async deleteReview(reviewId: string, userId: string) {
    await this.findReview(reviewId);
    await this.checkIsUserValid(reviewId, userId);

    await this.reviewRepository.deleteReview(reviewId);
  }

  async checkIsUserValid(reviewId: string, userId: string) {
    const review = await this.reviewRepository.findReview(reviewId);

    if (review.user.id !== userId) {
      throw new ReviewException(REVIEW_ERROR_CODE.BAD_REQUEST(REVIEW_MUTATION_FORBIDDEN));
    }
  }

  async createReviewReport(reviewId: string, userId: string, data: CreateReviewReportDTO) {
    const isExist = await this.reviewRepository.checkReviewReport(reviewId, userId);

    if (isExist) {
      throw new ReviewException(REVIEW_ERROR_CODE.CONFLICT(REVIEW_REPORT_ALREADY_EXISTS));
    }

    return await this.reviewRepository.createReviewReport(reviewId, userId, data);
  }

  async updateReviewReport(id: string, userId: string, data: UpdateReviewReportDTO) {
    const report = await this.reviewRepository.findReviewReport(id);
    if (report.user.id !== userId) {
      throw new ReviewException(REVIEW_ERROR_CODE.FORBIDDEN(REVIEW_REPORT_MUTATION_FORBIDDEN));
    }
    await this.reviewRepository.updateReviewReport(id, data);
  }

  async deleteReviewReport(id: string, userId: string) {
    const report = await this.reviewRepository.findReviewReport(id);
    if (report.user.id !== userId) {
      throw new ReviewException(REVIEW_ERROR_CODE.FORBIDDEN(REVIEW_REPORT_MUTATION_FORBIDDEN));
    }
    await this.reviewRepository.deleteReviewReport(id);
  }
}
