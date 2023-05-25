import { Module } from '@nestjs/common';

import { QnAController } from './qna.controller';
import { QnARepository } from './qna.repository';
import { QnAService } from './qna.service';

@Module({
  controllers: [QnAController],
  providers: [QnAService, QnARepository],
})
export class QnaModule {}
