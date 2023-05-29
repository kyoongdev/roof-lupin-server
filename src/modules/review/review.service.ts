import { Injectable } from '@nestjs/common';

import { CreateReviewDTO } from './dto/create-review.dto';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async createReview(props: CreateReviewDTO, userId: string) {
    return await this.reviewRepository.createReview(props, userId);
  }
}
