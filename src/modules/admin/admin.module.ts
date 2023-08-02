import { Module } from '@nestjs/common';

import { EncryptProvider } from '@/common/encrypt';
import { FCMEvent } from '@/event/fcm';
import { SchedulerEvent } from '@/event/scheduler';

import { AlarmRepository } from '../alarm/alarm.repository';
import { CategoryRepository } from '../category/category.repository';
import { CouponRepository } from '../coupon/coupon.repository';
import { CurationRepository } from '../curation/curation.repository';
import { ExhibitionRepository } from '../exhibition/exhibition.repository';
import { FaqRepository } from '../faq/faq.repository';
import { FileService } from '../file/file.service';
import { FrequentQuestionRepository } from '../frequent-question/frequent-question.repository';
import { HostRepository } from '../host/host.repository';
import { SettlementRepository } from '../host/settlement/settlement.repository';
import { LocationRepository } from '../location/location.repository';
import { QnARepository } from '../qna/qna.repository';
import { RankingRepository } from '../ranking/ranking.repository';
import { ReportRepository } from '../report/report.repository';
import { ReservationRepository } from '../reservation/reservation.repository';
import { ReviewRepository } from '../review/review.repository';
import { SearchRepository } from '../search/search.repository';
import { RentalTypeRepository } from '../space/rental-type/rental-type.repository';
import { SpaceRepository } from '../space/space.repository';
import { UserRepository } from '../user/user.repository';

import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';
import { AdminAlarmController } from './alarm/alarm.controller';
import { AdminAlarmService } from './alarm/alarm.service';
import { AdminCategoryController } from './category/category.controller';
import { AdminCategoryService } from './category/category.service';
import { AdminCouponController } from './coupon/coupon.controller';
import { AdminCouponRepository } from './coupon/coupon.repository';
import { AdminCouponService } from './coupon/coupon.service';
import { AdminCurationController } from './curation/curation.controller';
import { AdminCurationService } from './curation/curation.service';
import { AdminExhibitionController } from './exhibition/exhibition.controller';
import { AdminExhibitionService } from './exhibition/exhibition.service';
import { AdminFaqController } from './faq/faq.controller';
import { AdminFaqService } from './faq/faq.service';
import { AdminFrequentlyQuestionController } from './frequent-question/frequent-question.controller';
import { AdminFrequentQuestionService } from './frequent-question/frequent-question.service';
import { AdminHomeController } from './home/home.controller';
import { AdminHomeService } from './home/home.service';
import { AdminHostController } from './host/host.controller';
import { AdminHostService } from './host/host.service';
import { AdminIconController } from './icon/icon.controller';
import { IconRepository } from './icon/icon.repository';
import { AdminIconService } from './icon/icon.service';
import { AdminQnAController } from './qna';
import { AdminQnAService } from './qna/qna.service';
import { AdminRankingController } from './ranking/ranking.controller';
import { AdminRankingService } from './ranking/ranking.service';
import { AdminReportController } from './report/report.controller';
import { AdminReportService } from './report/report.service';
import { AdminReservationController } from './reservation/reservation.controller';
import { AdminReservationService } from './reservation/reservation.service';
import { AdminReviewController } from './review/review.controller';
import { AdminReviewService } from './review/review.service';
import { AdminSearchController } from './search/search.controller';
import { AdminSearchService } from './search/search.service';
import { AdminSettlementController } from './settlement/settlement.controller';
import { AdminSettlementService } from './settlement/settlement.service';
import { AdminSpaceController } from './space/space.controller';
import { AdminSpaceService } from './space/space.service';
import { AdminTermsController } from './terms/terms.controller';
import { AdminTermsService } from './terms/terms.service';
import { AdminUserController } from './user/user.controller';
import { AdminUserRepository } from './user/user.repository';
import { AdminUserService } from './user/user.service';

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
    AdminSettlementService,
    SettlementRepository,
    AdminCouponService,
    CouponRepository,
    AdminCouponRepository,
    CategoryRepository,
    UserRepository,
    FCMEvent,
    ExhibitionRepository,
    AdminExhibitionService,
    EncryptProvider,
    FileService,
    AdminUserService,
    AdminUserRepository,
    AdminCategoryService,
    CategoryRepository,
    AdminRankingService,
    RankingRepository,
    AdminHomeService,
    AdminSearchService,
    SearchRepository,
    AdminFrequentQuestionService,
    FrequentQuestionRepository,
    AdminIconService,
    IconRepository,
    AdminFaqService,
    FaqRepository,
    AdminCurationService,
    CurationRepository,
    AdminTermsService,
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
    AdminSettlementController,
    AdminCouponController,
    AdminExhibitionController,
    AdminUserController,
    AdminCategoryController,
    AdminRankingController,
    AdminHomeController,
    AdminSearchController,
    AdminFrequentlyQuestionController,
    AdminIconController,
    AdminFaqController,
    AdminCurationController,
    AdminTermsController,
  ],
})
export class AdminModule {}
