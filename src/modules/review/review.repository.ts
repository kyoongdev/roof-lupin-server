import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PagingDTO } from 'wemacu-nestjs';

import { PrismaService } from '@/database/prisma.service';

import { SpaceRepository } from '../space/space.repository';

import { CreateReviewDTO } from './dto/create-review.dto';
import { REVIEW_ERROR_CODE, SCORE_BAD_REQUEST } from './exception/errorCode';
import { ReviewException } from './exception/review.exception';

@Injectable()
export class ReviewRepository {
  constructor(private readonly database: PrismaService) {}

  async findReviews(args = {} as Prisma.SpaceReviewFindManyArgs) {
    const reviews = await this.database.spaceReview.findMany(args);

    return reviews;
  }

  async findPagingReviews(paging: PagingDTO, args = {} as Prisma.SpaceReviewFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.database.spaceReview.count({
      where: args.where,
    });
    const rows = await this.database.spaceReview.findMany({
      where: {
        ...args.where,
      },
      skip,
      take,
    });

    return { count, rows };
  }

  async findReview(id: string) {
    const review = await this.database.spaceReview.findUnique({
      where: {
        id,
      },
    });
    if (!review) {
      throw new ReviewException(REVIEW_ERROR_CODE.NOT_FOUND());
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
  async createReview(props: CreateReviewDTO, userId: string) {
    const { content, score, spaceId, images } = props;

    const review = await this.database.spaceReview.create({
      data: {
        content,
        score,
        space: {
          connect: {
            id: spaceId,
          },
        },
        images: {
          create: images.map((url) => ({
            image: {
              create: {
                url,
              },
            },
          })),
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return review.id;
  }
}
