import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { PrismaService } from '@/database/prisma.service';
import { ReviewReportDTO } from '@/modules/review/dto';
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
    const review = await this.findReview(id);

    const reviews = await this.reviewRepository.findReviews({
      where: {
        isBest: true,
      },
    });
    const bestCount = reviews.reduce<number>((acc, cur) => {
      return acc + cur.images.length;
    }, 0);

    if (bestCount)
      await this.reviewRepository.updateReview(id, {
        isBest,
      });
  }

  async findPagingReviewReports(paging: PagingDTO, args = {} as Prisma.SpaceReviewReportFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.reviewRepository.countReviewReports({
      where: args.where,
    });
    const reports = await this.reviewRepository.findReviewReports({
      where: args.where,
      skip,
      take,
    });
    return new PaginationDTO<ReviewReportDTO>(reports, { count, paging });
  }

  async updateReviewReportIsProcessed(id: string, isProcessed: boolean) {
    await this.reviewRepository.findReview(id);
    await this.reviewRepository.updateReviewReportIsProcessed(id, isProcessed);
  }

  async deleteReview(id: string) {
    return await this.reviewRepository.deleteReview(id);
  }
}
