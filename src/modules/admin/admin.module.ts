import { Module } from '@nestjs/common';

import { SchedulerEvent } from '@/event/scheduler';

import { AlarmRepository } from '../alarm/alarm.repository';
import { HostRepository } from '../host/host.repository';
import { LocationRepository } from '../location/location.repository';
import { QnARepository } from '../qna/qna.repository';
import { ReportRepository } from '../report/report.repository';
import { ReservationRepository } from '../reservation/reservation.repository';
import { ReviewRepository } from '../review/review.repository';
import { RentalTypeRepository } from '../space/rentalType/rentalType.repository';
import { SpaceRepository } from '../space/space.repository';

import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';
import { AdminAlarmController } from './alarm/alarm.controller';
import { AdminAlarmService } from './alarm/alarm.service';
import { AdminHostController } from './host';
import { AdminHostService } from './host/host.service';
import { AdminQnAController } from './qna';
import { AdminQnAService } from './qna/qna.service';
import { AdminReportController } from './report';
import { AdminReportService } from './report/report.service';
import { AdminReservationController } from './reservation/reservation.controller';
import { AdminReservationService } from './reservation/reservation.service';
import { AdminReviewController } from './review';
import { AdminReviewService } from './review/review.service';
import { AdminSpaceController } from './space/space.controller';
import { AdminSpaceService } from './space/space.service';

@Module({
  providers: [
    AdminService,
    AdminRepository,
    AdminReviewService,
    ReviewRepository,
    AdminQnAService,
    QnARepository,
    AdminReportService,
    ReportRepository,
    AdminHostService,
    HostRepository,
    AdminReservationService,
    ReservationRepository,
    AdminAlarmService,
    AlarmRepository,
    AdminSpaceService,
    SpaceRepository,
    SchedulerEvent,
    LocationRepository,
    RentalTypeRepository,
  ],
  controllers: [
    AdminController,
    AdminReviewController,
    AdminQnAController,
    AdminReportController,
    AdminHostController,
    AdminReservationController,
    AdminAlarmController,
    AdminSpaceController,
  ],
})
export class AdminModule {}
