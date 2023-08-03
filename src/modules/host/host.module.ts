import { Module } from '@nestjs/common';

import { EncryptProvider } from '@/common/encrypt';
import { FCMEvent } from '@/event/fcm';

import { FileService } from '../file/file.service';
import { LocationRepository } from '../location/location.repository';
import { QnARepository } from '../qna/qna.repository';
import { ReportRepository } from '../report/report.repository';
import { ReservationRepository } from '../reservation/reservation.repository';
import { ReviewRepository } from '../review/review.repository';
import { RentalTypeRepository } from '../space/rental-type/rental-type.repository';
import { SpaceRepository } from '../space/space.repository';
import { TaxReturnRepository } from '../tax-return/tax-return.repository';

import { BlockedTimeController } from './blocked-time/blocked-time.controller';
import { BlockedTimeRepository } from './blocked-time/blocked-time.repository';
import { BlockedTimeService } from './blocked-time/blocked-time.service';
import { HostController } from './host.controller';
import { HostRepository } from './host.repository';
import { HostService } from './host.service';
import { HostQnAController } from './qna/qna.controller';
import { HostQnAService } from './qna/qna.service';
import { HostReportController } from './report/report.controller';
import { HostReportService } from './report/report.service';
import { HostReservationController } from './reservation/reservation.controller';
import { HostReservationService } from './reservation/reservation.service';
import { HostReviewController } from './review/review.controller';
import { HostReviewService } from './review/review.service';
import { SettlementController } from './settlement/settlement.controller';
import { SettlementRepository } from './settlement/settlement.repository';
import { SettlementService } from './settlement/settlement.service';
import { HostSpaceController } from './space/space.controller';
import { HostSpaceService } from './space/space.service';
import { HostTaxReturnController } from './tax-return/tax-return.controller';
import { HostTaxReturnService } from './tax-return/tax-return.service';

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
    HostTaxReturnService,
    TaxReturnRepository,
    SettlementService,
    SettlementRepository,
    BlockedTimeRepository,
    BlockedTimeService,
    ReservationRepository,
    EncryptProvider,
    FileService,
    HostReservationService,
    ReservationRepository,
    FCMEvent,
  ],
  controllers: [
    HostController,
    HostReviewController,
    HostQnAController,
    HostReportController,
    HostSpaceController,
    HostTaxReturnController,
    SettlementController,
    BlockedTimeController,
    HostReservationController,
  ],
})
export class HostModule {}
