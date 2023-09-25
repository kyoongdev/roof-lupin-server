import { Module } from '@nestjs/common';

import { HostSettlementRepository } from '@/modules/host/settlement/settlement.repository';
import { ReservationRepository } from '@/modules/reservation/reservation.repository';
import { TossPayProvider } from '@/utils';

import { AdminPaymentController } from './payment.controller';
import { AdminPaymentService } from './payment.service';

@Module({
  providers: [TossPayProvider, ReservationRepository, AdminPaymentService, HostSettlementRepository],
  controllers: [AdminPaymentController],
})
export class AdminPaymentModule {}
