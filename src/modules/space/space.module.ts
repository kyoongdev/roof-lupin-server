import { Module } from '@nestjs/common';
import { SpaceService } from './space.service';
import { SpaceController } from './space.controller';
import { SpaceRepository } from './space.repository';

@Module({
  providers: [SpaceService, SpaceRepository],
  controllers: [SpaceController],
})
export class SpaceModule {}
