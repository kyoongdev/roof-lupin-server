import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { SpaceDTO } from '../space/dto';

import {
  BestPhotoDTO,
  CreateReviewAnswerDTO,
  CreateReviewDTO,
  CreateReviewReportDTO,
  ReviewAnswerDTO,
  ReviewDetailDTO,
  ReviewReportDTO,
  UpdateReviewAnswerDTO,
  UpdateReviewDTO,
  UpdateReviewReportDTO,
} from './dto';
import { ReviewImageDTO } from './dto/review-image.dto';
import { ReviewDTO } from './dto/review.dto';
import {
  REVIEW_ANSWER_NOT_FOUND,
  REVIEW_ERROR_CODE,
  REVIEW_IMAGE_NOT_FOUND,
  REVIEW_REPORT_NOT_FOUND,
} from './exception/errorCode';
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
            isBest: true,
          },
        },
        answers: {
          where: {
            deletedAt: null,
          },
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
      images: review.images.map((image) => ({ imageId: image.image.id, url: image.image.url, isBest: image.isBest })),
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
            isBest: true,
          },
        },
        answers: {
          where: {
            deletedAt: null,
          },
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
          images: review.images.map((image) => ({
            imageId: image.image.id,
            url: image.image.url,
            isBest: image.isBest,
          })),
        })
    );
  }

  async findBestPhotoReviews(spaceId: string) {
    const photos = await this.database.spaceReviewImage.findMany({
      where: {
        spaceReview: {
          isBest: true,
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

  async findReviewReport(id: string) {
    const report = await this.database.spaceReviewReport.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!report) {
      throw new ReviewException(REVIEW_ERROR_CODE.NOT_FOUND(REVIEW_REPORT_NOT_FOUND));
    }

    return new ReviewReportDTO(report);
  }

  async checkReviewReport(reviewId: string, userId: string) {
    const report = await this.database.spaceReviewReport.findFirst({
      where: {
        spaceReviewId: reviewId,
        userId,
      },
    });

    return report;
  }

  async countReviewReports(args = {} as Prisma.SpaceReviewReportCountArgs) {
    return await this.database.spaceReviewReport.count(args);
  }

  async findReviewReports(args = {} as Prisma.SpaceReviewReportFindManyArgs) {
    const reports = await this.database.spaceReviewReport.findMany({
      where: {
        ...args.where,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
      skip: args.skip,
      take: args.take,
    });

    return reports.map((report) => new ReviewReportDTO(report));
  }

  async createReviewReport(reviewId: string, userId: string, data: CreateReviewReportDTO) {
    await this.database.spaceReviewReport.create({
      data: {
        ...data,
        spaceReview: {
          connect: {
            id: reviewId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async updateReviewReport(id: string, data: UpdateReviewReportDTO) {
    await this.database.spaceReviewReport.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateReviewReportIsProcessed(id: string, isProcessed: boolean) {
    await this.database.spaceReviewReport.update({
      where: {
        id,
      },
      data: {
        isProcessed,
      },
    });
  }

  async deleteReviewReport(id: string) {
    await this.database.spaceReviewReport.delete({
      where: {
        id,
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

  async findReviewImage(reviewId: string, imageId: string) {
    const image = await this.database.spaceReviewImage.findUnique({
      where: {
        spaceReviewId_imageId: {
          imageId,
          spaceReviewId: reviewId,
        },
      },
      include: {
        image: true,
      },
    });
    if (!image) {
      throw new ReviewException(REVIEW_ERROR_CODE.NOT_FOUND(REVIEW_IMAGE_NOT_FOUND));
    }

    return new ReviewImageDTO({
      imageId,
      isBest: image.isBest,
      url: image.image.url,
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
          imageId: image.imageId,
          isBest: image.isBest,
          url: image.image.url,
        })
    );
  }

  async updateReviewImage(reviewId: string, imageId: string, isBest: boolean) {
    await this.database.spaceReviewImage.update({
      where: {
        spaceReviewId_imageId: {
          imageId,
          spaceReviewId: reviewId,
        },
      },
      data: {
        isBest,
      },
    });
  }
}
