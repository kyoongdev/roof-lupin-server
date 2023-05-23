import { Controller, Get } from '@nestjs/common';

@Controller('review')
export class ReviewController {
  @Get()
  getReviews(): string {
    return 'getReviews~';
  }
}
