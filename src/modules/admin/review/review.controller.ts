import { Delete, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO } from '@/common';
import { ReviewDTO, ReviewReportDTO } from '@/modules/review/dto';
import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

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

  @Get()
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

  @Get('reports')
  @RequestApi({
    summary: {
      description: '[관리자] 리뷰 신고 조회',
      summary: '리뷰 신고를 조회합니다. 관리자만 사용 가능합니다.',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: ReviewReportDTO,
    isPaging: true,
  })
  async getReviewReports(@Paging() paging: PagingDTO) {
    return await this.reviewService.findPagingReviewReports(paging);
  }

  @Post(':reviewId/image/:imageId/best')
  @RequestApi({
    summary: {
      description: '리뷰 이미지 베스트 설정',
      summary: '리뷰 이미지를 베스트로 설정합니다.',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async setBestReview(@Param('reviewId') reviewId: string, @Param('imageId') imageId: string) {
    await this.reviewService.createBestImage(reviewId, imageId);
  }

  @Post('reports/:reportId/process')
  @RequestApi({
    summary: {
      description: '[관리자] 리뷰 신고 처리',
      summary: '리뷰 신고를 처리합니다. 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async processReviewReport(@Param('reportId') reportId: string) {
    await this.reviewService.updateReviewReportIsProcessed(reportId, true);
  }

  @Delete('reports/:reportId/process')
  @RequestApi({
    summary: {
      description: '[관리자] 리뷰 신고 미완료 처리',
      summary: '리뷰 신고를 미완료 처리합니다. 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async unProcessReviewReport(@Param('reportId') reportId: string) {
    await this.reviewService.updateReviewReportIsProcessed(reportId, false);
  }

  @Delete(':reviewId/image/:imageId/best')
  @RequestApi({
    summary: {
      description: '베스트 포토 삭제',
      summary: '배스트 포토 삭제',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async deleteBestReview(@Param('reviewId') reviewId: string, @Param('imageId') imageId: string) {
    await this.reviewService.deleteBestImage(reviewId, imageId);
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
