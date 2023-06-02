import { Delete, Get, Param, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO } from '@/common';
import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminReviewDTO } from '../dto/review/admin-review.dto';

import { AdminReviewService } from './review.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('admins/reviews', '[관리자] 리뷰 관리')
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
    type: AdminReviewDTO,
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
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: AdminReviewDTO,
    isPaging: true,
  })
  async getReviews(@Paging() paging: PagingDTO) {
    return await this.reviewService.findPagingReviews(paging);
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
