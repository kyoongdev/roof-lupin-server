import { Module } from '@nestjs/common';

import { LocationRepository } from '../location/location.repository';

import { RentalTypeRepository } from './rentalType/rentalType.repository';
import { SpaceController } from './space.controller';
import { SpaceRepository } from './space.repository';
import { SpaceService } from './space.service';

@Module({
  providers: [SpaceService, SpaceRepository, LocationRepository, RentalTypeRepository],
  controllers: [SpaceController],
})
export class SpaceModule {}
