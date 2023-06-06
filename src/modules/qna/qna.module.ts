import { Module } from '@nestjs/common';

import { HostRepository } from '../host/host.repository';
import { LocationRepository } from '../location/location.repository';
import { SpaceRepository } from '../space/space.repository';

import { QnAController } from './qna.controller';
import { QnARepository } from './qna.repository';
import { QnAService } from './qna.service';

@Module({
  controllers: [QnAController],
  providers: [QnAService, QnARepository, SpaceRepository, HostRepository, LocationRepository],
})
export class QnaModule {}
