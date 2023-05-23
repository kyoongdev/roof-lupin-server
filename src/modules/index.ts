import { GlobalModule } from './global';
import { SpaceModule } from './space/space.module';
import { UserModule } from './user/user.module';
import { HostModule } from './host/host.module';
import { AdminModule } from './admin/admin.module';
import { ReportModule } from './report/report.module';

export const Modules = [GlobalModule, SpaceModule, UserModule, HostModule, AdminModule, ReportModule];
