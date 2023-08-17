import { Module } from '@nestjs/common';

import { QnARepository } from '../qna/qna.repository';
import { RentalTypeRepository } from '../rental-type/rental-type.repository';
import { ReviewRepository } from '../review/review.repository';
import { SpaceRepository } from '../space/space.repository';
import { UserRepository } from '../user/user.repository';

import { ReportController } from './report.controller';
import { ReportRepository } from './report.repository';
import { ReportService } from './report.service';

@Module({
  controllers: [ReportController],
  providers: [
    ReportService,
    ReportRepository,
    SpaceRepository,
    UserRepository,
    RentalTypeRepository,
    ReviewRepository,
    QnARepository,
  ],
})
export class ReportModule {}
