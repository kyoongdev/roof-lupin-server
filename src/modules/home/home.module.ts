import { Module } from '@nestjs/common';

import { RentalTypeRepository } from '../space/rentalType/rentalType.repository';
import { SpaceRepository } from '../space/space.repository';

import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  controllers: [HomeController],
  providers: [HomeService, SpaceRepository, RentalTypeRepository],
})
export class HomeModule {}
