import { Injectable } from '@nestjs/common';

import { SpaceRepository } from '../space/space.repository';

import { CreateReviewDTO } from './dto/create-review.dto';
import { REVIEW_ERROR_CODE, SCORE_BAD_REQUEST } from './exception/errorCode';
import { ReviewException } from './exception/review.exception';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository, private readonly spaceRepository: SpaceRepository) {}

  async createReview(props: CreateReviewDTO, userId: string) {
    const { score, spaceId } = props;

    if (score < 1 || score > 5) {
      throw new ReviewException(REVIEW_ERROR_CODE.BAD_REQUEST(SCORE_BAD_REQUEST));
    }

    await this.spaceRepository.findSpace(spaceId);
    return await this.reviewRepository.createReview(props, userId);
  }
}
