import { Module } from '@nestjs/common';

import { FrequentQuestionController } from './frequent-question.controller';
import { FrequentQuestionRepository } from './frequent-question.repository';
import { FrequentQuestionService } from './frequent-question.service';

@Module({
  providers: [FrequentQuestionService, FrequentQuestionRepository],
  controllers: [FrequentQuestionController],
})
export class FrequentQuestionModule {}
