import { Delete, Get, Param, Post } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO } from '@/common';
import { RequestHost } from '@/interface/role.interface';
import { ReviewDTO } from '@/modules/review/dto/review.dto';
import { ApiController, ReqUser } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { HostReviewService } from './review.service';

@ApiController('reviews', '[호스트] 리뷰 관리')
@Auth([JwtAuthGuard, RoleGuard('HOST')])
export class HostReviewController {
  constructor(private readonly reviewService: HostReviewService) {}

  @Get(':reviewId/detail')
  @RequestApi({
    summary: {
      description: '리뷰 상세 조회',
      summary: '리뷰 상세 조회 - 호스트만 사용 가능합니다.',
    },
    params: {
      name: 'reviewId',
      type: 'string',
      required: true,
      description: '리뷰 아이디',
    },
  })
  @ResponseApi({
    type: ReviewDTO,
  })
  async getReview(@Param('reviewId') reviewId: string) {
    await this.reviewService.findReview(reviewId);
  }

  @Get(':spaceId')
  @RequestApi({
    summary: {
      description: '리뷰 목록 조회',
      summary: '공간 리뷰 목록 조회 - 호스트만 사용 가능합니다.',
    },
    params: {
      name: 'spaceId',
      type: 'string',
      required: true,
      description: '공간 아이디',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: ReviewDTO,
    isPaging: true,
  })
  async getReviewsBySpaceID(
    @Paging() paging: PagingDTO,
    @Param('spaceId') spaceId: string,
    @ReqUser() user: RequestHost
  ) {
    return await this.reviewService.findPagingReviews(paging, {
      where: {
        spaceId,
        space: {
          hostId: user.id,
        },
      },
    });
  }

  @Get()
  @RequestApi({
    summary: {
      description: '전체 목록 조회',
      summary: '전체 리뷰 목록 조회 - 호스트만 사용 가능합니다.',
    },

    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: ReviewDTO,
    isPaging: true,
  })
  async getReviews(@Paging() paging: PagingDTO, @ReqUser() user: RequestHost) {
    return await this.reviewService.findPagingReviews(paging, {
      where: {
        space: {
          hostId: user.id,
        },
      },
    });
  }

  @Post(':reviewId/best')
  @RequestApi({
    summary: {
      description: '[호스트]리뷰 베스트 설정',
      summary: '리뷰를 베스트로 설정합니다. 호스트만 사용 가능합니다.',
    },
    params: {
      name: 'reviewId',
      description: '리뷰 id',
      type: 'string',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async setBestReview(@Param('reviewId') reviewId: string) {
    await this.reviewService.setIsBestReview(reviewId, true);
  }

  @Delete(':reviewId/best')
  @RequestApi({
    summary: {
      description: '[호스트] 리뷰 베스트 제외',
      summary: '리뷰를 베스트에서 제외합니다. 호스트만 사용 가능합니다.',
    },
    params: {
      name: 'reviewId',
      description: '리뷰 id',
      type: 'string',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async deleteBestReview(@Param('reviewId') reviewId: string) {
    await this.reviewService.setIsBestReview(reviewId, false);
  }
}
