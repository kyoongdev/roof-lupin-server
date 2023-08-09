import { Module } from '@nestjs/common';

import { FileService } from '@/modules/file/file.service';
import { RentalTypeRepository } from '@/modules/rental-type/rental-type.repository';
import { SpaceRepository } from '@/modules/space/space.repository';

import { HostSpaceController } from './space.controller';
import { HostSpaceService } from './space.service';

@Module({
  providers: [HostSpaceService, SpaceRepository, RentalTypeRepository, FileService],
  exports: [HostSpaceService, SpaceRepository, RentalTypeRepository, FileService],
  controllers: [HostSpaceController],
})
export class HostSpaceModule {}
