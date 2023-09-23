import { Module } from '@nestjs/common';

import { ReservationRepository } from '@/modules/reservation/reservation.repository';
import { PortOneProvider, TossPayProvider } from '@/utils';

import { HostSettlementRepository } from '../settlement/settlement.repository';

import { HostPaymentController } from './payment.controller';
import { HostPaymentService } from './payment.service';

@Module({
  providers: [HostPaymentService, PortOneProvider, ReservationRepository, HostSettlementRepository, TossPayProvider],
  controllers: [HostPaymentController],
})
export class HostPaymentModule {}
