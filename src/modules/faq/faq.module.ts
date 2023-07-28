import { Module } from '@nestjs/common';

import { FAQRepository } from '../admin/faq/faq.repository';

import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';

@Module({
  providers: [FaqService, FAQRepository],
  controllers: [FaqController],
})
export class FaqModule {}
