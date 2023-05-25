import { Module } from '@nestjs/common';

import { SpaceController } from './space.controller';
import { SpaceRepository } from './space.repository';
import { SpaceService } from './space.service';

@Module({
  providers: [SpaceService, SpaceRepository],
  controllers: [SpaceController],
})
export class SpaceModule {}
