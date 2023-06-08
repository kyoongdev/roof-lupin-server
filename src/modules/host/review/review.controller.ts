import { Get, Param } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { RequestHost } from '@/interface/role.interface';
import { ReviewDTO } from '@/modules/review/dto/review.dto';
import { ApiController, ReqUser } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { HostReviewService } from './review.service';

@ApiController('hosts/reviews', '[호스트] 리뷰 관리')
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
}
