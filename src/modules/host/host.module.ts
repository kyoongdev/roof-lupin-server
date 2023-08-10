import { Module } from '@nestjs/common';

import { EncryptProvider } from '@/common/encrypt';

import { HostAuthModule } from './auth/auth.module';
import { HostBlockedTimeModule } from './blocked-time/blocked-time.module';
import { HostController } from './host.controller';
import { HostRepository } from './host.repository';
import { HostService } from './host.service';
import { HostQnAModule } from './qna/qna.module';
import { HostReportModule } from './report/report.module';
import { HostReservationModule } from './reservation/reservation.module';
import { HostReviewModule } from './review/review.module';
import { HostServiceModule } from './service/service.module';
import { HostSettlementModule } from './settlement/settlement.module';
import { HostSpaceModule } from './space/space.module';
import { HostTaxReturnModule } from './tax-return/tax-return.module';

export const HostModules = [
  HostAuthModule,
  HostBlockedTimeModule,
  HostQnAModule,
  HostReportModule,
  HostReservationModule,
  HostReviewModule,
  HostServiceModule,
  HostSettlementModule,
  HostSpaceModule,
  HostTaxReturnModule,
];

@Module({
  providers: [HostService, HostRepository, EncryptProvider],
  controllers: [HostController],
  imports: [...HostModules],
})
export class HostModule {}
