import { Module } from '@nestjs/common';

import { ClientRevalidateEvent } from '@/event/client';

import { SpaceController } from './space.controller';
import { SpaceRepository } from './space.repository';
import { SpaceService } from './space.service';

@Module({
  providers: [SpaceService, SpaceRepository, ClientRevalidateEvent],
  controllers: [SpaceController],
})
export class SpaceModule {}
