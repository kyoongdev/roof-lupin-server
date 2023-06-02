import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

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
        deletedAt: null,
      },
    });
    const reviews = await this.reviewRepository.findReviews({
      where: {
        ...args.where,
        deletedAt: null,
      },
      skip,
      take,
    });
    return new PaginationDTO<ReviewDTO>(reviews, { count, paging });
  }
}
