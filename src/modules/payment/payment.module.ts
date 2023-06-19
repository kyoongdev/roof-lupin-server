import { Module } from '@nestjs/common';

import { KakaoPayProvider } from '@/common/payment';

import { PaymentController } from './payment.controller';

@Module({
  providers: [KakaoPayProvider],
  controllers: [PaymentController],
})
export class PaymentModule {}
