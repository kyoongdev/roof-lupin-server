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
