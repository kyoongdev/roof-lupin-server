import { Body, Delete, Get, Param, Post, Query } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO } from '@/common';
import { CreateBestReviewImagesDTO, ReviewDTO, ReviewImageDetailDTO } from '@/modules/review/dto';
import { DeleteBestReviewImagesQuery } from '@/modules/review/dto/query';
import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminFindReviewImagesQuery } from '../dto/query';
import { AdminFindReviewsQuery } from '../dto/query/review/find-reviews.query';

import { AdminReviewService } from './review.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('reviews', '[관리자] 리뷰 관리')
export class AdminReviewController {
  constructor(private readonly reviewService: AdminReviewService) {}

  @Get(':reviewId/detail')
  @RequestApi({
    summary: {
      description: '[관리자]리뷰 조회',
      summary: '리뷰를 조회합니다. 관리자만 사용 가능합니다.',
    },
    params: {
      name: 'reviewId',
      description: '리뷰 id',
      type: 'string',
    },
  })
  @ResponseApi({
    type: ReviewDTO,
  })
  async getReview(@Param('reviewId') reviewId: string) {
    return await this.reviewService.findReview(reviewId);
  }

  @Get('')
  @RequestApi({
    summary: {
      description: '공간 리뷰 조회',
      summary: '공간 리뷰를 조회합니다. 관리자만 사용이 가능합니다.',
    },
  })
  @ResponseApi({
    type: ReviewDTO,
    isPaging: true,
  })
  async getReviews(@Paging() paging: PagingDTO, @Query() query: AdminFindReviewsQuery) {
    return await this.reviewService.findPagingReviews(paging, query.generateQuery());
  }

  @Get('images')
  @RequestApi({
    summary: {
      description: '공간 리뷰 이미지 조회',
      summary: '공간 리뷰 이미지를 조회합니다. 관리자만 사용이 가능합니다.',
    },
  })
  @ResponseApi({
    type: ReviewImageDetailDTO,
    isPaging: true,
  })
  async getReviewImages(@Paging() paging: PagingDTO, @Query() query: AdminFindReviewImagesQuery) {
    return await this.reviewService.findPagingReviewImages(paging, query.generateQuery());
  }

  @Post('images/:reviewImageId/best')
  @RequestApi({
    summary: {
      description: '리뷰 이미지 베스트 설정',
      summary: '리뷰 이미지를 베스트로 설정합니다.',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async setBestReview(@Param('reviewImageId') reviewImageId: string) {
    await this.reviewService.createBestImage(reviewImageId);
  }

  @Post('/spaces/:spaceId/images/best')
  @RequestApi({
    summary: {
      description: '공간 내 리뷰 이미지 베스트 다수 설정',
      summary: '공간 내 리뷰 이미지 베스트 다수 설정',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async setBestReviews(@Param('reviewId') reviewId: string, @Body() data: CreateBestReviewImagesDTO) {
    await this.reviewService.createBestImages(reviewId, data);
  }

  @Delete('images/:reviewImageId/best')
  @RequestApi({
    summary: {
      description: '베스트 포토 삭제',
      summary: '배스트 포토 삭제',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async deleteBestReview(@Param('reviewImageId') reviewImageId: string) {
    await this.reviewService.deleteBestImage(reviewImageId);
  }

  @Delete('images/best')
  @RequestApi({
    summary: {
      description: '공간 내 리뷰 이미지 베스트 다수 삭제',
      summary: '공간 내 리뷰 이미지 베스트 다수 삭제',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async deleteBestReviews(@Param('spaceId') spaceId: string, @Query() query: DeleteBestReviewImagesQuery) {
    await this.reviewService.deleteBestImages(query);
  }

  @Delete(':id')
  @RequestApi({
    summary: {
      description: '[관리자]리뷰 삭제',
      summary: '리뷰를 삭제합니다. 관리자만 사용 가능합니다.',
    },
    params: {
      name: 'id',
      description: '리뷰 id',
      type: 'string',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteReview(@Param('id') id: string) {
    await this.reviewService.deleteReview(id);
  }
}
