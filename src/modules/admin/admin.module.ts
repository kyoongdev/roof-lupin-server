import { Module } from '@nestjs/common';

import { EncryptProvider } from '@/common/encrypt';

import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';
import { AdminAlarmModule } from './alarm/alarm.module';
import { AdminAuthModule } from './auth/auth.module';
import { AdminCategoryModule } from './category/category.module';
import { AdminContentModule } from './content/content.module';
import { AdminCouponModule } from './coupon/coupon.module';
import { AdminCurationModule } from './curation/curation.module';
import { AdminExhibitionModule } from './exhibition/exhibition.module';
import { AdminFaqModule } from './faq/faq.module';
import { AdminFileModule } from './file/file.module';
import { AdminFrequentQuestionModule } from './frequent-question/frequent-question.module';
import { AdminHomeModule } from './home/home.module';
import { AdminHostModule } from './host/host.module';
import { AdminIconModule } from './icon/icon.module';
import { AdminLocationFilterModule } from './location-filter/location-filter.module';
import { AdminQnAModule } from './qna/qna.module';
import { AdminRankingModule } from './ranking/ranking.module';
import { AdminRentalTypeModule } from './rental-type/rental-type.module';
import { AdminReportModule } from './report/report.module';
import { AdminReservationModule } from './reservation/reservation.module';
import { AdminReviewModule } from './review/review.module';
import { AdminSearchModule } from './search/search.module';
import { AdminServiceModule } from './service/service.module';
import { AdminSettlementModule } from './settlement/settlement.module';
import { AdminSpaceModule } from './space/space.module';
import { AdminTaxReturnModule } from './tax-return/tax-return.module';
import { AdminTermsModule } from './terms/terms.module';
import { AdminUserModule } from './user/user.module';

export const AdminModules = [
  AdminAuthModule,
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
  AdminLocationFilterModule,
  AdminContentModule,
  AdminFileModule,
  AdminTaxReturnModule,
  AdminRentalTypeModule,
];

@Module({
  providers: [AdminService, AdminRepository, EncryptProvider],
  controllers: [AdminController],
  imports: [...AdminModules],
})
export class AdminModule {}
