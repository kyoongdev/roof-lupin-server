import { Module } from '@nestjs/common';

import { ReviewRepository } from '../review/review.repository';

import { HostController } from './host.controller';
import { HostRepository } from './host.repository';
import { HostService } from './host.service';
import { HostReviewController } from './review';
import { HostReviewService } from './review/review.service';

@Module({
  providers: [HostService, HostRepository, HostReviewService, ReviewRepository],
  controllers: [HostController, HostReviewController],
})
export class HostModule {}
