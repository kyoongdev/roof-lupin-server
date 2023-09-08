import { Body, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard, JwtNullableAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { ReviewCountDTO, ReviewDetailDTO, ReviewsSummaryDTO, UpdateMyReviewDTO, UpdateReviewDTO } from './dto';
import { CreateReviewDTO } from './dto/create-review.dto';
import { FindReviewsQuery } from './dto/query';
import { ReviewImageDTO } from './dto/review-image.dto';
import { ReviewDTO } from './dto/review.dto';
import { ReviewService } from './review.service';

@ApiController('reviews', '공간 리뷰')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('reservations/:reservationId')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '예약 아이디로 나의 리뷰 조회',
      summary: '예약 아이디로 나의 리뷰 조회',
    },
  })
  @ResponseApi({
    type: ReviewDetailDTO,
  })
  async getReviewByReservationId(@Param('reservationId') reservationId: string, @ReqUser() user: RequestUser) {
    return await this.reviewService.findReviewByReservationId(reservationId, user.id);
  }

  @Get(':spaceId/summary')
  @RequestApi({
    summary: {
      description: '공간의 리뷰 요약',
      summary: '공간의 리뷰 요약을 불러옵니다.',
    },
  })
  @ResponseApi({
    type: ReviewsSummaryDTO,
  })
  async getReviewSummary(@Param('spaceId') spaceId: string) {
    return await this.reviewService.getReviewSummary(spaceId);
  }

  @Get(':spaceId/paging')
  @RequestApi({
    summary: {
      description: '공간의 리뷰 목록',
      summary: '공간의 리뷰 목록을 불러옵니다.',
    },
    params: {
      name: 'spaceId',
      type: 'string',
      description: '공간 아이디',
    },
  })
  @ResponseApi({
    type: ReviewDTO,
    isPaging: true,
  })
  async getPagingSpaceReviews(
    @Param('spaceId') spaceId: string,
    @Paging() paging: PagingDTO,
    @Query() query: FindReviewsQuery
  ) {
    const args = await ReviewDTO.generateQuery(query, spaceId);
    return await this.reviewService.findPagingReviews(paging, {
      where: {
        ...args.where,
        spaceId,
      },
      orderBy: args.orderBy,
    });
  }

  @Get(':spaceId/list')
  @RequestApi({
    summary: {
      description: '공강의 리뷰 목록',
      summary: '공간의 리뷰 목록을 불러옵니다.',
    },
    params: {
      name: 'spaceId',
      type: 'string',
      description: '공간 아이디',
    },
  })
  @ResponseApi({
    type: ReviewDTO,
    isArray: true,
  })
  async getSpaceReviews(@Param('spaceId') spaceId: string) {
    return await this.reviewService.findReviews({
      where: {
        spaceId,
      },
    });
  }

  @Get(':spaceId/best')
  @RequestApi({
    summary: {
      description: '공강의 베스트 포토 목록',
      summary: '공간의 베스트 포토 목록을 불러옵니다.',
    },
  })
  @ResponseApi({
    type: ReviewImageDTO,
    isArray: true,
  })
  async getSpaceBestReviews(@Param('spaceId') spaceId: string) {
    return await this.reviewService.findBestReviewImages(spaceId);
  }

  @Get('list')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '내가 작성한 리뷰 목록',
      summary: '내가 작성한 리뷰 목록을 불러옵니다. 유저만 사용이 가능합니다.',
    },
  })
  @ResponseApi({
    type: ReviewDTO,
    isArray: true,
  })
  async getMyReviews(@ReqUser() user: RequestUser) {
    return await this.reviewService.findReviews({
      where: {
        userId: user.id,
      },
    });
  }

  @Get('paging')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '내가 작성한 리뷰 목록',
      summary: '내가 작성한 리뷰 목록을 불러옵니다. 유저만 사용이 가능합니다.',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: ReviewDTO,
    isPaging: true,
  })
  async getMyReviewsPaging(@Paging() paging: PagingDTO, @ReqUser() user: RequestUser) {
    return await this.reviewService.findPagingReviews(paging, {
      where: {
        userId: user.id,
      },
    });
  }

  @Get('count')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '내가 작성한 리뷰 개수',
      summary: '내가 작성한 리뷰 개수를 불러옵니다. 유저만 사용이 가능합니다.',
    },
  })
  @ResponseApi({
    type: ReviewCountDTO,
  })
  async countMyReviewsPaging(@ReqUser() user: RequestUser) {
    return await this.reviewService.countReviews({
      where: {
        userId: user.id,
      },
    });
  }

  @Get(':reviewId/detail')
  @Auth([JwtNullableAuthGuard])
  @RequestApi({
    summary: {
      description: '리뷰 자세히 불러오기',
      summary: '리뷰 자세히 불러오기',
    },
  })
  @ResponseApi({
    type: ReviewDetailDTO,
  })
  async getReview(@Param('reviewId') reviewId: string, @ReqUser() user?: RequestUser) {
    return await this.reviewService.findReview(reviewId, user?.id);
  }

  @Post()
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '공간 리뷰 생성',
      summary: '공간 리뷰를 생성합니다. 유저만 사용이 가능합니다.',
    },
    body: {
      type: CreateReviewDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createReview(@Body() body: CreateReviewDTO, @ReqUser() user: RequestUser) {
    return await this.reviewService.createReview(body, user.id);
  }

  @Patch(':reviewId')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '공간 리뷰 수정',
      summary: '공간 리뷰를 수정합니다. 리뷰 작성자만 사용이 가능합니다.',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateReview(
    @Body() body: UpdateMyReviewDTO,
    @Param('reviewId') reviewId: string,
    @ReqUser() user: RequestUser
  ) {
    await this.reviewService.updateReview(reviewId, user.id, body);
  }

  @Delete(':reviewId')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @RequestApi({
    summary: {
      description: '공간 리뷰 삭제',
      summary: '공간 리뷰를 삭제합니다. 리뷰 작성자만 사용이 가능합니다.',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteReview(@Param('reviewId') reviewId: string, @ReqUser() user: RequestUser) {
    await this.reviewService.deleteReview(reviewId, user.id);
  }
}
