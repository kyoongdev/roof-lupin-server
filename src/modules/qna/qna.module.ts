import { Module } from '@nestjs/common';

import { EncryptProvider } from '@/common/encrypt';
import { FCMEvent } from '@/event/fcm';

import { HostRepository } from '../host/host.repository';
import { RentalTypeRepository } from '../space/rental-type/rental-type.repository';
import { SpaceRepository } from '../space/space.repository';

import { QnAController } from './qna.controller';
import { QnARepository } from './qna.repository';
import { QnAService } from './qna.service';

@Module({
  controllers: [QnAController],
  providers: [QnAService, QnARepository],
})
export class QnaModule {}
