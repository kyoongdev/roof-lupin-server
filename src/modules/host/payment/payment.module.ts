import { Module } from '@nestjs/common';

import { PortOneProvider } from '@/utils';

import { HostPaymentController } from './payment.controller';
import { HostPaymentService } from './payment.service';

@Module({
  providers: [HostPaymentService, PortOneProvider],
  controllers: [HostPaymentController],
})
export class HostPaymentModule {}
