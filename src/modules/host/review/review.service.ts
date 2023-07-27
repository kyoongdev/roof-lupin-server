import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { ReviewDTO } from '@/modules/review/dto/review.dto';
import { ReviewRepository } from '@/modules/review/review.repository';

@Injectable()
export class HostReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async findReview(id: string) {
    return await this.reviewRepository.findReview(id);
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

  async setIsBestReview(id: string, isBest: boolean) {
    await this.findReview(id);
    await this.reviewRepository.updateReview(id, {
      isBest,
    });
  }
}
