import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { getTimeDiff } from '@/common/date';
import { HistoryRepository } from '@/modules/history/history.repository';
import { CreateReviewAnswerDTO, UpdateReviewAnswerDTO } from '@/modules/review/dto';
import { ReviewDTO } from '@/modules/review/dto/review.dto';
import {
  BEST_PHOTO_LENGTH_EXCEEDED,
  REVIEW_ANSWER_ALREADY_WRITTEN,
  REVIEW_ANSWER_MUTATION_FORBIDDEN,
  REVIEW_ANSWER_UPDATE_DUE_DATE,
  REVIEW_ERROR_CODE,
  REVIEW_MUTATION_FORBIDDEN,
} from '@/modules/review/exception/errorCode';
import { ReviewException } from '@/modules/review/exception/review.exception';
import { ReviewRepository } from '@/modules/review/review.repository';

@Injectable()
export class HostReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly historyRepository: HistoryRepository
  ) {}

  async findReview(id: string) {
    return await this.reviewRepository.findReview(id);
  }

  async findReviews(args = {} as Prisma.SpaceReviewFindManyArgs) {
    return await this.reviewRepository.findReviews(args);
  }

  async countReviews(args = {} as Prisma.SpaceReviewCountArgs) {
    return await this.reviewRepository.countReviews(args);
  }

  async findPagingReviews(paging: PagingDTO, args = {} as Prisma.SpaceReviewFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.reviewRepository.countReviews({
      where: {
        ...args.where,
      },
    });
    const reviews = await this.reviewRepository.findReviews({
      where: {
        ...args.where,
      },
      skip,
      take,
    });
    return new PaginationDTO<ReviewDTO>(reviews, { count, paging });
  }

  async createReviewAnswer(reviewId: string, hostId: string, data: CreateReviewAnswerDTO) {
    const review = await this.findReview(reviewId);
    const reviewAnswer = await this.reviewRepository.checkReviewAnswer(reviewId, hostId);

    if (reviewAnswer) {
      throw new ReviewException(REVIEW_ERROR_CODE.FORBIDDEN(REVIEW_ANSWER_ALREADY_WRITTEN));
    }

    if (review.space.hostId !== hostId) {
      throw new ReviewException(REVIEW_ERROR_CODE.FORBIDDEN(REVIEW_ANSWER_MUTATION_FORBIDDEN));
    }

    return await this.reviewRepository.createReviewAnswer(reviewId, hostId, data);
  }

  async updateReviewAnswer(reviewAnswerId: string, hostId: string, data: UpdateReviewAnswerDTO) {
    const reviewAnswer = await this.reviewRepository.findReviewAnswer(reviewAnswerId);

    if (reviewAnswer.host.id !== hostId) {
      throw new ReviewException(REVIEW_ERROR_CODE.FORBIDDEN(REVIEW_ANSWER_MUTATION_FORBIDDEN));
    }

    const timeDiff = getTimeDiff(reviewAnswer.createdAt, new Date());

    if (timeDiff > 72) {
      throw new ReviewException(REVIEW_ERROR_CODE.FORBIDDEN(REVIEW_ANSWER_UPDATE_DUE_DATE));
    }

    await this.historyRepository.createHistory({
      content: reviewAnswer.content,
      writtenAt: reviewAnswer.createdAt,
      spaceReviewAnswerId: reviewAnswer.id,
    });

    await this.reviewRepository.updateReviewAnswer(reviewAnswerId, data);
  }

  async deleteReviewAnswer(reviewAnswerId: string, hostId: string) {
    const reviewAnswer = await this.reviewRepository.findReviewAnswer(reviewAnswerId);

    if (reviewAnswer.host.id !== hostId) {
      throw new ReviewException(REVIEW_ERROR_CODE.FORBIDDEN(REVIEW_ANSWER_MUTATION_FORBIDDEN));
    }

    await this.reviewRepository.deleteReviewAnswer(reviewAnswerId);
  }

  async createBestImage(id: string, hostId: string) {
    const reviewImage = await this.reviewRepository.findReviewImage(id);
    const review = await this.findReview(reviewImage.reviewId);

    if (review.space.hostId !== hostId) {
      throw new ReviewException(REVIEW_ERROR_CODE.FORBIDDEN(REVIEW_MUTATION_FORBIDDEN));
    }

    const bestPhotos = await this.reviewRepository.findBestReviewImages({
      where: {
        spaceReview: {
          spaceId: review.space.id,
        },
      },
    });

    if (bestPhotos.length >= 10) {
      throw new ReviewException(REVIEW_ERROR_CODE.CONFLICT(BEST_PHOTO_LENGTH_EXCEEDED));
    }

    await this.reviewRepository.updateReviewImage(id, true);
  }

  async deleteBestImage(id: string, hostId: string) {
    const reviewImage = await this.reviewRepository.findReviewImage(id);
    const review = await this.findReview(reviewImage.reviewId);

    if (review.space.hostId !== hostId) {
      throw new ReviewException(REVIEW_ERROR_CODE.FORBIDDEN(REVIEW_MUTATION_FORBIDDEN));
    }

    await this.reviewRepository.updateReviewImage(id, false);
  }
}
