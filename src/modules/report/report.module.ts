import { Module } from '@nestjs/common';

import { SpaceRepository } from '../space/space.repository';
import { UserRepository } from '../user/user.repository';

import { ReportController } from './report.controller';
import { ReportRepository } from './report.repository';
import { ReportService } from './report.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService, ReportRepository, SpaceRepository, UserRepository],
})
export class ReportModule {}
