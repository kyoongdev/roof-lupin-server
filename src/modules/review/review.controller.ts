import { Get } from '@nestjs/common';

import { ApiController } from '@/utils';

@ApiController('review', '공간 리뷰')
export class ReviewController {
  @Get()
  getReviews(): string {
    return 'getReviews~~';
  }
}
