import { Body, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleInterceptorAPI } from '@/utils/interceptor/role.interceptor';

import { UpdateReviewDTO } from './dto';
import { CreateReviewDTO } from './dto/create-review.dto';
import { ReviewService } from './review.service';

@ApiController('review', '공간 리뷰')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Get()
  getReviews(): string {
    return 'getReviews~~';
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
  @ResponseApi({
    type: ResponseWithIdDTO,
  })
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
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async updateReview(@Body() body: UpdateReviewDTO, @Param('reviewId') reviewId: string, @ReqUser() user: RequestUser) {
    await this.reviewService.updateReview(reviewId, user.id, body);
  }
}
