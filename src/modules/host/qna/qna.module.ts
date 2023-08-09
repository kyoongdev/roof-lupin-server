import { Module } from '@nestjs/common';

import { FCMEvent } from '@/event/fcm';
import { QnARepository } from '@/modules/qna/qna.repository';

import { HostQnAController } from './qna.controller';
import { HostQnAService } from './qna.service';

@Module({
  providers: [HostQnAService, QnARepository, FCMEvent],
  exports: [HostQnAService, QnARepository, FCMEvent],
  controllers: [HostQnAController],
})
export class HostQnAModule {}
