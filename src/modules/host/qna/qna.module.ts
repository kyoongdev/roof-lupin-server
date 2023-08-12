import { Module } from '@nestjs/common';

import { FCMEvent } from '@/event/fcm';
import { HistoryRepository } from '@/modules/history/history.repository';
import { QnARepository } from '@/modules/qna/qna.repository';
import { UserRepository } from '@/modules/user/user.repository';

import { HostQnAController } from './qna.controller';
import { HostQnAService } from './qna.service';

@Module({
  providers: [HostQnAService, QnARepository, FCMEvent, HistoryRepository, UserRepository],
  exports: [HostQnAService, QnARepository, FCMEvent, HistoryRepository],
  controllers: [HostQnAController],
})
export class HostQnAModule {}
