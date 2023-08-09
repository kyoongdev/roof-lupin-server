import { Module } from '@nestjs/common';

import { FrequentQuestionRepository } from '@/modules/frequent-question/frequent-question.repository';

import { AdminFrequentlyQuestionController } from './frequent-question.controller';
import { AdminFrequentQuestionService } from './frequent-question.service';

@Module({
  providers: [AdminFrequentQuestionService, FrequentQuestionRepository],
  controllers: [AdminFrequentlyQuestionController],
  exports: [AdminFrequentQuestionService, FrequentQuestionRepository],
})
export class AdminFrequentQuestionModule {}
