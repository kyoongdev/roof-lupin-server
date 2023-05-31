import { Module } from '@nestjs/common';

import { HostRepository } from '../host/host.repository';
import { SpaceRepository } from '../space/space.repository';

import { QnAController } from './qna.controller';
import { QnARepository } from './qna.repository';
import { QnAService } from './qna.service';

@Module({
  controllers: [QnAController],
  providers: [QnAService, QnARepository, SpaceRepository, HostRepository],
})
export class QnaModule {}
