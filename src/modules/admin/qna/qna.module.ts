import { Module } from '@nestjs/common';

import { QnARepository } from '@/modules/qna/qna.repository';

import { AdminQnAController } from './qna.controller';
import { AdminQnAService } from './qna.service';

@Module({
  providers: [AdminQnAService, QnARepository],
  exports: [AdminQnAService, QnARepository],
  controllers: [AdminQnAController],
})
export class AdminQnAModule {}
