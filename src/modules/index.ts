import { AdminModule } from './admin/admin.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { AppInfoModule } from './app-info/app-info.module';
import { AuthModule } from './auth/auth.module';
import { CouponModule } from './coupon/coupon.module';
import { FaqModule } from './faq/faq.module';
import { FileModule } from './file/file.module';
import { GlobalModule } from './global';
import { HomeModule } from './home/home.module';
import { HostModule } from './host/host.module';
import { QnaModule } from './qna/qna.module';
import { ReportModule } from './report/report.module';
import { ReviewModule } from './review/review.module';
import { SpaceModule } from './space/space.module';
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
];
