import { Module } from '@nestjs/common';

import { FaqRepository } from '@/modules/faq/faq.repository';

import { AdminFaqController } from './faq.controller';
import { AdminFaqService } from './faq.service';

@Module({
  providers: [AdminFaqService, FaqRepository],
  controllers: [AdminFaqController],
  exports: [AdminFaqService, FaqRepository],
})
export class AdminFaqModule {}
