import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { BestPhotoDTO, CreateReviewDTO, UpdateReviewDTO } from './dto';
import { ReviewDTO } from './dto/review.dto';
import { BEST_PHOTO_NOT_FOUND, REVIEW_ERROR_CODE } from './exception/errorCode';
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

  async findBestPhotoReviews(spaceId: string) {
    const photos = await this.database.spaceReviewImage.findMany({
      where: {
        isBest: true,
        spaceReview: {
          spaceId,
        },
      },
      include: {
        image: true,
      },
    });

    return photos.map(
      (photo) =>
        new BestPhotoDTO({
          id: photo.image.id,
          url: photo.image.url,
        })
    );
  }

  async findBestPhotoReview(reviewId: string, imageId: string) {
    const bestPhoto = await this.database.spaceReviewImage.findUnique({
      where: {
        spaceReviewId_imageId: {
          spaceReviewId: reviewId,
          imageId,
        },
      },
      include: {
        image: true,
      },
    });

    if (!bestPhoto) {
      throw new ReviewException(REVIEW_ERROR_CODE.NOT_FOUND(BEST_PHOTO_NOT_FOUND));
    }

    return new BestPhotoDTO({
      id: bestPhoto.image.id,
      url: bestPhoto.image.url,
    });
  }

  async createBestPhotoReview(reviewId: string, imageId: string) {
    await this.database.spaceReviewImage.update({
      where: {
        spaceReviewId_imageId: {
          spaceReviewId: reviewId,
          imageId,
        },
      },
      data: {
        isBest: true,
      },
    });
  }

  async deleteBestPhotoReview(reviewId: string, imageId: string) {
    await this.database.spaceReviewImage.update({
      where: {
        spaceReviewId_imageId: {
          spaceReviewId: reviewId,
          imageId,
        },
      },
      data: {
        isBest: false,
      },
    });
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
