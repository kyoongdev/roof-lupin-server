import { Injectable } from '@nestjs/common';

import { ReviewRepository } from '@/modules/review/review.repository';

@Injectable()
export class AdminReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async deleteReview(id: string) {
    return await this.reviewRepository.deleteReview(id);
  }
}
