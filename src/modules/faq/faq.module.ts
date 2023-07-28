import { Module } from '@nestjs/common';

import { FaqController } from './faq.controller';
import { FaqRepository } from './faq.repository';
import { FaqService } from './faq.service';

@Module({
  providers: [FaqService, FaqRepository],
  controllers: [FaqController],
})
export class FaqModule {}
