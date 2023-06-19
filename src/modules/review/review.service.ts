import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { SpaceRepository } from '../space/space.repository';

import { UpdateReviewDTO } from './dto';
import { CreateReviewDTO } from './dto/create-review.dto';
import { ReviewDTO } from './dto/review.dto';
import { REVIEW_ERROR_CODE, REVIEW_MUTATION_FORBIDDEN, SCORE_BAD_REQUEST } from './exception/errorCode';
import { ReviewException } from './exception/review.exception';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository, private readonly spaceRepository: SpaceRepository) {}

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
        ...(args.orderBy && !Array.isArray(args.orderBy) && [{ ...args.orderBy }]),
      ],
    });
    const rows = await this.reviewRepository.findReviews({
      skip,
      take,
    });
    return new PaginationDTO<ReviewDTO>(rows, { count, paging });
  }

  async createReview(props: CreateReviewDTO, userId: string) {
    const { score, spaceId } = props;

    if (score < 1 || score > 5) {
      throw new ReviewException(REVIEW_ERROR_CODE.BAD_REQUEST(SCORE_BAD_REQUEST));
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
}
