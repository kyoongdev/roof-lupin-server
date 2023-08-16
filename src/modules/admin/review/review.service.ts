import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { ReviewReportDTO } from '@/modules/review/dto';
import { BEST_PHOTO_LENGTH_EXCEEDED, REVIEW_ERROR_CODE } from '@/modules/review/exception/errorCode';
import { ReviewException } from '@/modules/review/exception/review.exception';
import { ReviewRepository } from '@/modules/review/review.repository';

@Injectable()
export class AdminReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async findReview(id: string) {
    return await this.reviewRepository.findReview(id);
  }

  async findPagingReviews(paging: PagingDTO, args = {} as Prisma.SpaceReviewFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.reviewRepository.countReviews({
      where: args.where,
    });
    const rows = await this.reviewRepository.findReviews({
      where: args.where,
      skip,
      take,
    });

    return new PaginationDTO(rows, { count, paging });
  }

  async deleteReview(id: string) {
    return await this.reviewRepository.deleteReview(id);
  }

  async createBestImage(reviewId: string, imageId: string) {
    const review = await this.findReview(reviewId);
    await this.reviewRepository.findReviewImage(reviewId, imageId);

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

    await this.reviewRepository.updateReviewImage(reviewId, imageId, true);
  }
  async deleteBestImage(reviewId: string, imageId: string) {
    const review = await this.findReview(reviewId);
    await this.reviewRepository.findReviewImage(reviewId, imageId);

    await this.reviewRepository.updateReviewImage(reviewId, imageId, false);
  }
}
