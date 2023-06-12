import { Module } from '@nestjs/common';

import { LocationRepository } from '../location/location.repository';
import { QnARepository } from '../qna/qna.repository';
import { ReportRepository } from '../report/report.repository';
import { ReviewRepository } from '../review/review.repository';
import { RentalTypeRepository } from '../space/rentalType/rentalType.repository';
import { SpaceRepository } from '../space/space.repository';

import { HostController } from './host.controller';
import { HostRepository } from './host.repository';
import { HostService } from './host.service';
import { HostQnAController } from './qna/qna.controller';
import { HostQnAService } from './qna/qna.service';
import { HostReportController } from './report/report.controller';
import { HostReportService } from './report/report.service';
import { HostReviewController } from './review/review.controller';
import { HostReviewService } from './review/review.service';
import { HostSpaceController } from './space/space.controller';
import { HostSpaceService } from './space/space.service';

@Module({
  providers: [
    HostService,
    HostRepository,
    HostReviewService,
    ReviewRepository,
    HostQnAService,
    QnARepository,
    HostReportService,
    ReportRepository,
    HostSpaceService,
    SpaceRepository,
    LocationRepository,
    RentalTypeRepository,
  ],
  controllers: [HostController, HostReviewController, HostQnAController, HostReportController, HostSpaceController],
})
export class HostModule {}
