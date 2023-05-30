import { Body, Delete, Get, Param, Patch, Post, Req, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleInterceptorAPI } from '@/utils/interceptor/role.interceptor';

import { UpdateReviewDTO } from './dto';
import { CreateReviewDTO } from './dto/create-review.dto';
import { ReviewDTO } from './dto/review.dto';
import { ReviewService } from './review.service';

@ApiController('reviews', '공간 리뷰')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get(':spaceId')
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
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: ReviewDTO,
    isArray: true,
  })
  async getSpaceReviews(@Param('spaceId') spaceId: string, @Paging() paging: PagingDTO) {
    return await this.reviewService.findPagingReviews(paging, {
      where: {
        spaceId,
      },
    });
  }

  @Get('me/list')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI('USER'))
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

  @Get('me/paging')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI('USER'))
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

  @Post()
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI('USER'), ResponseWithIdInterceptor)
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
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI('USER'))
  @RequestApi({
    summary: {
      description: '공간 리뷰 수정',
      summary: '공간 리뷰를 수정합니다. 리뷰 작성자만 사용이 가능합니다.',
    },
    body: {
      type: UpdateReviewDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateReview(@Body() body: UpdateReviewDTO, @Param('reviewId') reviewId: string, @ReqUser() user: RequestUser) {
    await this.reviewService.updateReview(reviewId, user.id, body);
  }

  @Delete(':reviewId')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI('USER'))
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
