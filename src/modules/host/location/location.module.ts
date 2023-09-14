import { Module } from '@nestjs/common';

import { LocationService } from '@/modules/location/location.service';

import { HostLocationController } from './location.controller';

@Module({
  providers: [LocationService],
  controllers: [HostLocationController],
})
export class HostLocationModule {}
