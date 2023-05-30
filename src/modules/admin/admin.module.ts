import { Module } from '@nestjs/common';

import { ReviewRepository } from '../review/review.repository';

import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';
import { AdminReviewController } from './review';
import { AdminReviewService } from './review/review.service';

@Module({
  providers: [AdminService, AdminRepository, AdminReviewService, ReviewRepository],
  controllers: [AdminController, AdminReviewController],
})
export class AdminModule {}
