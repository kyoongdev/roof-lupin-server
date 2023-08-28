import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { SpaceDTO } from '../space/dto';

import {
  BestPhotoDTO,
  CreateReviewAnswerDTO,
  CreateReviewDTO,
  ReviewAnswerDTO,
  ReviewDetailDTO,
  ReviewImageDetailDTO,
  UpdateReviewAnswerDTO,
  UpdateReviewDTO,
} from './dto';
import { ReviewImageDTO } from './dto/review-image.dto';
import { ReviewDTO } from './dto/review.dto';
import { REVIEW_ANSWER_NOT_FOUND, REVIEW_ERROR_CODE, REVIEW_IMAGE_NOT_FOUND } from './exception/errorCode';
import { ReviewException } from './exception/review.exception';

@Injectable()
export class ReviewRepository {
  constructor(private readonly database: PrismaService) {}

  async findReview(id: string, answerWhere = {} as Prisma.SpaceReviewAnswerWhereInput) {
    const review = await this.database.spaceReview.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          include: {
            socials: true,
          },
        },
        images: {
          include: {
            image: true,
          },
        },
        answers: {
          where: answerWhere,
          include: {
            host: true,
          },
        },
        space: {
          include: SpaceDTO.getSpacesIncludeOption(),
        },
      },
    });

    if (!review) {
      throw new ReviewException(REVIEW_ERROR_CODE.NOT_FOUND());
    }

    return new ReviewDetailDTO({
      ...review,
      images: review.images.map((image) => ({
        id: image.id,
        url: image.image.url,
        isBest: image.isBest,
        imageId: image.image.id,
        reviewId: image.spaceReviewId,
      })),
      space: SpaceDTO.generateSpaceDTO(review.space),
    });
  }

  async findFirstReview(
    args = {} as Prisma.SpaceReviewFindFirstArgs,
    answerWhere = {} as Prisma.SpaceReviewAnswerWhereInput
  ) {
    const review = await this.database.spaceReview.findFirst({
      where: args.where,
      include: {
        user: {
          include: {
            socials: true,
          },
        },
        images: {
          include: {
            image: true,
          },
        },
        answers: {
          where: answerWhere,
          include: {
            host: true,
          },
        },
        space: {
          include: SpaceDTO.getSpacesIncludeOption(),
        },
      },
    });

    if (!review) {
      throw new ReviewException(REVIEW_ERROR_CODE.NOT_FOUND());
    }

    return new ReviewDetailDTO({
      ...review,
      answer: review.answers.filter((answer) => !answer.deletedAt).at(-1),
      images: review.images.map((image) => ({
        id: image.id,
        url: image.image.url,
        isBest: image.isBest,
        imageId: image.image.id,
        reviewId: image.spaceReviewId,
      })),
      space: SpaceDTO.generateSpaceDTO(review.space),
    });
  }

  async countReviews(args = {} as Prisma.SpaceReviewCountArgs) {
    return await this.database.spaceReview.count(args);
  }

  async getReviewAverageScore(spaceId: string) {
    const score = await this.database.spaceReview.aggregate({
      where: {
        spaceId,
      },
      _avg: {
        score: true,
      },
    });

    return score._avg.score;
  }

  async findReviews(
    args = {} as Prisma.SpaceReviewFindManyArgs,
    answerWhere = {} as Prisma.SpaceReviewAnswerWhereInput
  ) {
    const reviews = await this.database.spaceReview.findMany({
      where: {
        ...args.where,
      },
      include: {
        user: {
          include: {
            socials: true,
          },
        },
        images: {
          include: {
            image: true,
          },
        },
        answers: {
          where: answerWhere,
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

    return reviews.map(
      (review) =>
        new ReviewDTO({
          ...review,
          answer: review.answers.filter((answer) => !answer.deletedAt).at(-1),
          images: review.images.map((image) => ({
            id: image.id,
            imageId: image.image.id,
            isBest: image.isBest,
            url: image.image.url,
            reviewId: image.spaceReviewId,
          })),
        })
    );
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

  async countReviewImages(args = {} as Prisma.SpaceReviewImageCountArgs) {
    return await this.database.spaceReviewImage.count(args);
  }

  async findReviewImages(
    args = {} as Prisma.SpaceReviewImageFindManyArgs,
    answerWhere = {} as Prisma.SpaceReviewAnswerWhereInput
  ) {
    const images = await this.database.spaceReviewImage.findMany({
      ...args,
      include: {
        spaceReview: {
          include: {
            user: {
              include: {
                socials: true,
              },
            },
            images: {
              include: {
                image: true,
              },
            },
            answers: {
              where: answerWhere,
              include: {
                host: true,
              },
            },
          },
        },
        image: true,
      },
    });

    return images.map(
      (image) =>
        new ReviewImageDetailDTO({
          ...image,
          url: image.image.url,
          review: {
            ...image.spaceReview,
            answer: image.spaceReview.answers.filter((answer) => !answer.deletedAt).at(-1),
            images: image.spaceReview.images.map((image) => ({
              id: image.id,
              imageId: image.imageId,
              isBest: image.isBest,
              url: image.image.url,
              reviewId: image.spaceReviewId,
            })),
          },
        })
    );
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
        reservation: {
          connect: {
            id: props.reservationId,
          },
        },
      },
    });

    return review.id;
  }

  async updateReview(id: string, props: UpdateReviewDTO) {
    if (props.images) {
      await this.database.image.deleteMany({
        where: {
          spaceReviewImages: {
            some: {
              spaceReviewId: id,
            },
          },
        },
      });
    }

    await this.database.spaceReview.update({
      where: {
        id,
      },
      data: {
        content: props.content,
        score: props.score,
        images: props.images && {
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
    await this.database.spaceReview.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async hardDeleteReview(id: string) {
    await this.database.spaceReview.delete({
      where: {
        id,
      },
    });
  }

  async findReviewAnswer(id: string) {
    const reviewAnswer = await this.database.spaceReviewAnswer.findUnique({
      where: {
        id,
      },
      include: {
        host: true,
      },
    });

    if (!reviewAnswer) {
      throw new ReviewException(REVIEW_ERROR_CODE.NOT_FOUND(REVIEW_ANSWER_NOT_FOUND));
    }

    return new ReviewAnswerDTO(reviewAnswer);
  }
  async checkReviewAnswer(reviewId: string, hostId: string) {
    const reviewAnswer = await this.database.spaceReviewAnswer.findFirst({
      where: {
        reviewId,
        hostId,
      },
      include: {
        host: true,
      },
    });

    if (!reviewAnswer) {
      return null;
    }

    return new ReviewAnswerDTO(reviewAnswer);
  }

  async createReviewAnswer(reviewId: string, hostId: string, data: CreateReviewAnswerDTO) {
    const { content } = data;

    const reviewAnswer = await this.database.spaceReviewAnswer.create({
      data: {
        content,
        review: {
          connect: {
            id: reviewId,
          },
        },
        host: {
          connect: {
            id: hostId,
          },
        },
      },
    });

    return reviewAnswer.id;
  }

  async updateReviewAnswer(reviewAnswerId: string, data: UpdateReviewAnswerDTO) {
    await this.database.spaceReviewAnswer.update({
      where: {
        id: reviewAnswerId,
      },
      data,
    });
  }

  async deleteReviewAnswer(reviewAnswerId: string) {
    await this.database.spaceReviewAnswer.update({
      where: {
        id: reviewAnswerId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async findReviewImage(id: string) {
    const image = await this.database.spaceReviewImage.findUnique({
      where: {
        id,
      },
      include: {
        image: true,
      },
    });
    if (!image) {
      throw new ReviewException(REVIEW_ERROR_CODE.NOT_FOUND(REVIEW_IMAGE_NOT_FOUND));
    }

    return new ReviewImageDTO({
      id: image.id,
      imageId: image.imageId,
      isBest: image.isBest,
      url: image.image.url,
      reviewId: image.spaceReviewId,
    });
  }

  async findBestReviewImages(args = {} as Prisma.SpaceReviewImageFindManyArgs) {
    const images = await this.database.spaceReviewImage.findMany({
      ...args,
      where: {
        ...args.where,
        isBest: true,
      },
      include: {
        image: true,
      },
    });

    return images.map(
      (image) =>
        new ReviewImageDTO({
          id: image.id,
          imageId: image.imageId,
          isBest: image.isBest,
          url: image.image.url,
          reviewId: image.spaceReviewId,
        })
    );
  }

  async updateReviewImage(id: string, isBest: boolean) {
    await this.database.spaceReviewImage.update({
      where: {
        id,
      },
      data: {
        isBest,
      },
    });
  }
}
