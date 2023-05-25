import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CouponModule } from './coupon/coupon.module';
import { GlobalModule } from './global';
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
];
