import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { PrismaService } from '@/database/prisma.service';
import { ReviewRepository } from '@/modules/review/review.repository';

import { AdminReviewDTO } from '../dto/review/admin-review.dto';

@Injectable()
export class AdminReviewService {
  constructor(private readonly reviewRepository: ReviewRepository, private readonly database: PrismaService) {}

  async findPagingReviews(paging: PagingDTO, args = {} as Prisma.SpaceReviewFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.database.spaceReview.count({
      where: args.where,
    });
    const rows = await this.database.spaceReview.findMany({
      where: {
        ...args.where,
      },
      include: {
        user: true,
        images: {
          select: {
            image: {
              select: {
                id: true,
                url: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
      skip,
      take,
    });

    return new PaginationDTO(
      rows.map((review) => new AdminReviewDTO(review)),
      { count, paging }
    );
  }

  async deleteReview(id: string) {
    return await this.reviewRepository.deleteReview(id);
  }
}
