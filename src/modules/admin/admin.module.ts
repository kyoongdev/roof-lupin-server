import { Module } from '@nestjs/common';

import { EncryptProvider } from '@/common/encrypt';

import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';
import { AdminAlarmModule } from './alarm/alarm.module';
import { AdminCategoryModule } from './category/category.module';
import { AdminCouponModule } from './coupon/coupon.module';
import { AdminCurationModule } from './curation/curation.module';
import { AdminExhibitionModule } from './exhibition/exhibition.module';
import { AdminFaqModule } from './faq/faq.module';
import { AdminFrequentQuestionModule } from './frequent-question/frequent-question.module';
import { AdminHomeModule } from './home/home.module';
import { AdminHostModule } from './host/host.module';
import { AdminIconModule } from './icon/icon.module';
import { AdminQnAModule } from './qna/qna.module';
import { AdminRankingModule } from './ranking/ranking.module';
import { AdminReportModule } from './report/report.module';
import { AdminReservationModule } from './reservation/reservation.module';
import { AdminReviewModule } from './review/review.module';
import { AdminSearchModule } from './search/search.module';
import { AdminServiceModule } from './service/service.module';
import { AdminSettlementModule } from './settlement/settlement.module';
import { AdminSpaceModule } from './space/space.module';
import { AdminTermsModule } from './terms/terms.module';
import { AdminUserModule } from './user/user.module';

@Module({
  providers: [AdminService, AdminRepository, EncryptProvider],
  controllers: [AdminController],
  imports: [
    AdminAlarmModule,
    AdminCategoryModule,
    AdminCouponModule,
    AdminCurationModule,
    AdminExhibitionModule,
    AdminFaqModule,
    AdminFrequentQuestionModule,
    AdminHomeModule,
    AdminHostModule,
    AdminIconModule,
    AdminQnAModule,
    AdminRankingModule,
    AdminReportModule,
    AdminReservationModule,
    AdminReviewModule,
    AdminSearchModule,
    AdminServiceModule,
    AdminSettlementModule,
    AdminSpaceModule,
    AdminTermsModule,
    AdminUserModule,
  ],
})
export class AdminModule {}
