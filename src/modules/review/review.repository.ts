import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { PagingDTO } from 'wemacu-nestjs';
import { ReviewException } from './exception/review.exception';
import { REVIEW_ERROR_CODE } from './exception/errorCode';

@Injectable()
export class ReviewRepository {
  constructor(private readonly database: PrismaService) {}

  async findReviews(args = {} as Prisma.SpaceReviewFindManyArgs) {
    const reviews = await this.database.spaceReview.findMany(args);

    return reviews;
  }

  async findReviewsWithPaging(paging: PagingDTO, args = {} as Prisma.SpaceReviewFindManyArgs) {
    const count = await this.database.spaceReview.count({
      where: args.where,
    });
    const rows = await this.database.spaceReview.findMany(args);

    return { count, rows };
  }

  async findReview(id: string) {
    const review = await this.database.spaceReview.findUnique({
      where: {
        id,
      },
    });
    if (!review) {
      throw new ReviewException(REVIEW_ERROR_CODE.NOT_FOUND);
    }

    return review;
  }

  async findReviewsWithSpaceId(spaceId: string) {
    const reviews = await this.database.spaceReview.findMany({
      where: {
        spaceId,
      },
    });

    return reviews;
  }

  async findPagingReviewsWithSpaceId(paging: PagingDTO, spaceId: string) {
    const count = await this.database.spaceReview.count({
      where: {
        spaceId,
      },
    });
    const reviews = await this.database.spaceReview.findMany({
      where: {
        spaceId,
      },
    });

    return { count, reviews };
  }
}
