import { Module } from '@nestjs/common';

import { HistoryRepository } from '../history/history.repository';

import { QnAController } from './qna.controller';
import { QnARepository } from './qna.repository';
import { QnAService } from './qna.service';

@Module({
  controllers: [QnAController],
  providers: [QnAService, QnARepository, HistoryRepository],
})
export class QnaModule {}
