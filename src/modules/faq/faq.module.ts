import { Module } from '@nestjs/common';

import { FaqController } from './faq.controller';
import { FAQRepository } from './faq.repository';
import { FaqService } from './faq.service';

@Module({
  providers: [FaqService, FAQRepository],
  controllers: [FaqController],
})
export class FaqModule {}
