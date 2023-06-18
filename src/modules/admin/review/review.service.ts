import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { PrismaService } from '@/database/prisma.service';
import { ReviewRepository } from '@/modules/review/review.repository';

@Injectable()
export class AdminReviewService {
  constructor(private readonly reviewRepository: ReviewRepository, private readonly database: PrismaService) {}

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

  async setIsBestReview(id: string, isBest: boolean) {
    await this.findReview(id);
    await this.reviewRepository.updateReview(id, {
      isBest,
    });
  }

  async deleteReview(id: string) {
    return await this.reviewRepository.deleteReview(id);
  }
}
