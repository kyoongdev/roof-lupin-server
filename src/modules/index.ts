import { GlobalModule } from './global';
import { SpaceModule } from './space/space.module';
import { UserModule } from './user/user.module';
import { HostModule } from './host/host.module';
import { AdminModule } from './admin/admin.module';
import { ReportModule } from './report/report.module';
import { ReviewModule } from './review/review.module';
import { QnaModule } from './qna/qna.module';
import { AuthModule } from './auth/auth.module';

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
];
