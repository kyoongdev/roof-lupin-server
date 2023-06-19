import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CreateReviewDTO, UpdateReviewDTO } from './dto';
import { ReviewDTO } from './dto/review.dto';
import { REVIEW_ERROR_CODE } from './exception/errorCode';
import { ReviewException } from './exception/review.exception';

@Injectable()
export class ReviewRepository {
  constructor(private readonly database: PrismaService) {}

  async findReview(id: string) {
    const review = await this.database.spaceReview.findUnique({
      where: {
        id,
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
        answers: {
          include: {
            host: true,
          },
        },
      },
    });

    if (!review) {
      throw new ReviewException(REVIEW_ERROR_CODE.NOT_FOUND());
    }

    return new ReviewDTO(review);
  }

  async countReviews(args = {} as Prisma.SpaceReviewCountArgs) {
    return await this.database.spaceReview.count(args);
  }

  async findReviews(args = {} as Prisma.SpaceReviewFindManyArgs) {
    const reviews = await this.database.spaceReview.findMany({
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
        answers: {
          include: {
            host: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
      skip: args.skip,
      take: args.take,
    });

    return reviews.map((review) => new ReviewDTO(review));
  }

  //TODO: best photo review
  // async findBestPhotoReviews(spaceId: string) {}

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
    await this.updateReviewAverageScore(review.id, score);
    return review.id;
  }
  async updateReview(id: string, props: UpdateReviewDTO) {
    if (props.score) {
      await this.updateReviewAverageScore(id, props.score);
    }

    await this.database.spaceReview.update({
      where: {
        id,
      },
      data: {
        content: props.content,
        score: props.score,
        images: props.images && {
          deleteMany: {},
          create: props.images.map((url) => ({
            image: {
              create: {
                url,
              },
            },
          })),
        },
      },
    });
  }

  async deleteReview(id: string) {
    await this.database.spaceReview.delete({
      where: {
        id,
      },
    });
  }

  async updateReviewAverageScore(id: string, score: number) {
    const review = await this.database.spaceReview.findUnique({
      where: {
        id,
      },
    });
    const reviewsCount = await this.countReviews({
      where: {
        spaceId: review.spaceId,
      },
    });
    const reviewScore = await this.database.spaceReview.aggregate({
      where: {
        spaceId: review.spaceId,
      },
      _avg: {
        score: true,
      },
    });
    const newAverageScore = (reviewScore._avg.score * reviewsCount - review.score + score) / reviewsCount;

    await this.database.space.update({
      where: {
        id: review.spaceId,
      },
      data: {
        averageScore: new Prisma.Decimal(Number(newAverageScore.toFixed(1))),
      },
    });
  }
}
