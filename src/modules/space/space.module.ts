import { Module } from '@nestjs/common';

import { RentalTypeController } from './rentalType/rentalType.controller';
import { RentalTypeService } from './rentalType/rentalType.service';
import { SpaceController } from './space.controller';
import { SpaceRepository } from './space.repository';
import { SpaceService } from './space.service';

@Module({
  providers: [SpaceService, SpaceRepository, RentalTypeService],
  controllers: [SpaceController, RentalTypeController],
})
export class SpaceModule {}
