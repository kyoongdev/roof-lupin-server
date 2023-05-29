import { Body, Get, Post, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { ResponseWithIdDTO } from '@/common';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleInterceptorAPI } from '@/utils/interceptor/role.interceptor';

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
}
