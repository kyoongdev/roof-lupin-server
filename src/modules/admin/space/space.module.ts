import { Module } from '@nestjs/common';

import { RentalTypeRepository } from '@/modules/rental-type/rental-type.repository';
import { SpaceRepository } from '@/modules/space/space.repository';

import { AdminSpaceController } from './space.controller';
import { AdminSpaceService } from './space.service';

@Module({
  providers: [AdminSpaceService, SpaceRepository, RentalTypeRepository],
  exports: [AdminSpaceService, SpaceRepository, RentalTypeRepository],
  controllers: [AdminSpaceController],
})
export class AdminSpaceModule {}
