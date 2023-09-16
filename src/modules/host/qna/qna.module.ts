import { Module } from '@nestjs/common';

import { MessageEvent } from '@/event/message';
import { HistoryRepository } from '@/modules/history/history.repository';
import { QnARepository } from '@/modules/qna/qna.repository';
import { UserRepository } from '@/modules/user/user.repository';

import { HostQnAController } from './qna.controller';
import { HostQnAService } from './qna.service';

@Module({
  providers: [HostQnAService, QnARepository, MessageEvent, HistoryRepository, UserRepository],
  exports: [HostQnAService, QnARepository, MessageEvent, HistoryRepository],
  controllers: [HostQnAController],
})
export class HostQnAModule {}
