import { AdminModule } from './admin/admin.module';
import { AlarmModule } from './alarm/alarm.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { AppInfoModule } from './app-info/app-info.module';
import { AuthModule } from './auth/auth.module';
import { BlockedTimeModule } from './blocked-time/blocked-times.module';
import { CategoryModule } from './category/category.module';
import { CouponModule } from './coupon/coupon.module';
import { CurationModule } from './curation/curation.module';
import { FaqModule } from './faq/faq.module';
import { FileModule } from './file/file.module';
import { GlobalModule } from './global';
import { HomeModule } from './home/home.module';
import { HostModule } from './host/host.module';
import { LocationModule } from './location/location.module';
import { MainModule } from './main/main.module';
import { PaymentModule } from './payment/payment.module';
import { QnaModule } from './qna/qna.module';
import { ReportModule } from './report/report.module';
import { ReservationModule } from './reservation/reservation.module';
import { ReviewModule } from './review/review.module';
import { SearchModule } from './search/search.module';
import { SettlementModule } from './settlement/settlement.module';
import { SpaceModule } from './space/space.module';
import { TaxReturnModule } from './tax-return/tax-return.module';
import { UserModule } from './user/user.module';

export const Modules = [
  GlobalModule,
  SpaceModule,
  UserModule,
  HostModule,
  AdminModule,
  ReportModule,
  ReviewModule,
  QnaModule,
  AuthModule,
  CouponModule,
  FileModule,
  HomeModule,
  AppInfoModule,
  AnnouncementModule,
  FaqModule,
  SearchModule,
  LocationModule,
  ReservationModule,
  AlarmModule,
  MainModule,
  CategoryModule,
  CurationModule,
  SettlementModule,
  TaxReturnModule,
  PaymentModule,
  BlockedTimeModule,
];
