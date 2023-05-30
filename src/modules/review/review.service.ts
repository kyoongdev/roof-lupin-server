import { Injectable } from '@nestjs/common';

import { SpaceRepository } from '../space/space.repository';

import { UpdateReviewDTO } from './dto';
import { CreateReviewDTO } from './dto/create-review.dto';
import { REVIEW_DELETE_FORBIDDEN, REVIEW_ERROR_CODE, SCORE_BAD_REQUEST } from './exception/errorCode';
import { ReviewException } from './exception/review.exception';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository, private readonly spaceRepository: SpaceRepository) {}

  async findReview(id: string) {
    const review = await this.reviewRepository.findReview(id);

    return review;
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
    const review = await this.reviewRepository.findReview(reviewId);

    if (review.userId !== userId) {
      throw new ReviewException(REVIEW_ERROR_CODE.BAD_REQUEST(REVIEW_DELETE_FORBIDDEN));
    }

    await this.reviewRepository.updateReview(reviewId, props);
  }

  async deleteReview(reviewId: string, userId: string) {
    const review = await this.reviewRepository.findReview(reviewId);

    if (review.userId !== userId) {
      throw new ReviewException(REVIEW_ERROR_CODE.BAD_REQUEST(REVIEW_DELETE_FORBIDDEN));
    }

    await this.reviewRepository.deleteReview(reviewId);
  }
}
