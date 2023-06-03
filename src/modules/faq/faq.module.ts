import { Module } from '@nestjs/common';

import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';

@Module({
  providers: [FaqService],
  controllers: [FaqController],
})
export class FaqModule {}
