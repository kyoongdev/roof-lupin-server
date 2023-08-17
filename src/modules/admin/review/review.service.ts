import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { CreateBestReviewImagesDTO, ReviewImageDetailDTO, ReviewReportDTO } from '@/modules/review/dto';
import { DeleteBestReviewImagesQuery } from '@/modules/review/dto/query';
import { BEST_PHOTO_LENGTH_EXCEEDED, REVIEW_ERROR_CODE } from '@/modules/review/exception/errorCode';
import { ReviewException } from '@/modules/review/exception/review.exception';
import { ReviewRepository } from '@/modules/review/review.repository';

@Injectable()
export class AdminReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

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

  async findPagingReviewImages(paging: PagingDTO, args = {} as Prisma.SpaceReviewImageFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.reviewRepository.countReviewImages({
      where: args.where,
    });
    const images = await this.reviewRepository.findReviewImages({
      where: args.where,
      skip,
      take,
    });

    return new PaginationDTO<ReviewImageDetailDTO>(images, { paging, count });
  }

  async deleteReview(id: string) {
    return await this.reviewRepository.deleteReview(id);
  }

  async createBestImages(spaceId: string, data: CreateBestReviewImagesDTO) {
    const bestPhotos = await this.reviewRepository.findBestReviewImages({
      where: {
        spaceReview: {
          spaceId,
        },
      },
    });

    if (bestPhotos.length >= 10) {
      throw new ReviewException(REVIEW_ERROR_CODE.CONFLICT(BEST_PHOTO_LENGTH_EXCEEDED));
    }

    await Promise.all(
      data.ids.map(async (id) => {
        await this.reviewRepository.findReviewImage(id);
        await this.reviewRepository.updateReviewImage(id, true);
      })
    );
  }

  async createBestImage(id: string) {
    const reviewImage = await this.reviewRepository.findReviewImage(id);
    const review = await this.findReview(reviewImage.reviewId);

    const bestPhotos = await this.reviewRepository.findBestReviewImages({
      where: {
        spaceReview: {
          spaceId: review.space.id,
        },
      },
    });

    if (bestPhotos.length >= 10) {
      throw new ReviewException(REVIEW_ERROR_CODE.CONFLICT(BEST_PHOTO_LENGTH_EXCEEDED));
    }

    await this.reviewRepository.updateReviewImage(id, true);
  }

  async deleteBestImages(reviewId: string, query: DeleteBestReviewImagesQuery) {
    await this.findReview(reviewId);

    await Promise.all(
      query.ids.split(',').map(async (id) => {
        await this.reviewRepository.findReviewImage(id);
        await this.reviewRepository.updateReviewImage(id, false);
      })
    );
  }

  async deleteBestImage(id: string) {
    await this.reviewRepository.findReviewImage(id);

    await this.reviewRepository.updateReviewImage(id, false);
  }
}
