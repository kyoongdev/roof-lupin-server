import { Delete, Param, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO } from '@/common';
import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleInterceptorAPI } from '@/utils/interceptor/role.interceptor';

import { AdminReviewService } from './review.service';

@ApiController('admin/review', '관리자 리뷰 관리')
export class AdminReviewController {
  constructor(private readonly reviewService: AdminReviewService) {}

  @Delete(':id')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI('ADMIN'))
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
