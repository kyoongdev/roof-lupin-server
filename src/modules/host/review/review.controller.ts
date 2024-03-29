import { Body, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { RequestHost } from '@/interface/role.interface';
import { CreateReviewAnswerDTO, ReviewDetailDTO, UpdateReviewAnswerDTO } from '@/modules/review/dto';
import { ReviewDTO } from '@/modules/review/dto/review.dto';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { HostFindReviewCountQuery, HostFindReviewsQuery } from '../dto/query';
import { HostReviewCountDTO } from '../dto/review';

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
    type: ReviewDetailDTO,
  })
  async getReview(@Param('reviewId') reviewId: string) {
    return await this.reviewService.findReview(reviewId);
  }

  @Get('spaces/:spaceId')
  @RequestApi({
    summary: {
      description: '리뷰 목록 조회',
      summary: '공간 리뷰 목록 조회 - 호스트만 사용 가능합니다.',
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
    @ReqUser() user: RequestHost,
    @Query() query: HostFindReviewsQuery
  ) {
    return await this.reviewService.findPagingReviews(paging, {
      where: {
        spaceId,
        space: {
          hostId: user.id,
        },
        ...query.generateQuery(),
      },
    });
  }

  @Get('spaces/:spaceId/count')
  @RequestApi({
    summary: {
      description: '미답변 리뷰 개수 조회',
      summary: '미답변 리뷰 개수 조회',
    },
  })
  @ResponseApi({
    type: HostReviewCountDTO,
  })
  async getNotAnsweredReviewsCount(
    @Param('spaceId') spaceId: string,
    @ReqUser() user: RequestHost,
    @Query() query: HostFindReviewCountQuery
  ) {
    return await this.reviewService.countReviews({
      where: {
        space: {
          hostId: user.id,
        },
        spaceId,
        ...query.generateQuery(),
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

  @Post('image/:reviewImageId/best')
  @RequestApi({
    summary: {
      description: '베스트 포토 생성',
      summary: '베스트 포토 생성',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async setBestReview(
    @Param('reviewImageId') reviewImageId: string,

    @ReqUser() user: RequestHost
  ) {
    await this.reviewService.createBestImage(reviewImageId, user.id);
  }

  @Delete('image/:reviewImageId/best')
  @RequestApi({
    summary: {
      description: '베스트 포토 삭제',
      summary: '베스트 포토 삭제',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async deleteBestReview(@Param('reviewImageId') reviewImageId: string, @ReqUser() user: RequestHost) {
    await this.reviewService.deleteBestImage(reviewImageId, user.id);
  }

  @Post(':reviewId/answers')
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: ' 리뷰 답변',
      summary: '리뷰에 답변합니다.',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createReviewAnswer(
    @Param('reviewId') reviewId: string,
    @ReqUser() user: RequestHost,
    @Body() data: CreateReviewAnswerDTO
  ) {
    return await this.reviewService.createReviewAnswer(reviewId, user.id, data);
  }

  @Patch('answers/:reviewAnswerId')
  @RequestApi({
    summary: {
      description: ' 리뷰 답변 수정',
      summary: '리뷰에 답변 수정',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateReviewAnswer(
    @Param('reviewAnswerId') reviewAnswerId: string,
    @ReqUser() user: RequestHost,
    @Body() data: UpdateReviewAnswerDTO
  ) {
    return await this.reviewService.updateReviewAnswer(reviewAnswerId, user.id, data);
  }

  @Delete('answers/:reviewAnswerId')
  @RequestApi({
    summary: {
      description: ' 리뷰 답변 수정',
      summary: '리뷰에 답변 수정',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteReviewAnswer(@Param('reviewId') reviewId: string, @ReqUser() user: RequestHost) {
    return await this.reviewService.deleteReviewAnswer(reviewId, user.id);
  }
}
