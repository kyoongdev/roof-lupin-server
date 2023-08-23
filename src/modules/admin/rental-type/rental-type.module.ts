import { Module } from '@nestjs/common';

import { RentalTypeRepository } from '@/modules/rental-type/rental-type.repository';

import { AdminRentalTypeController } from './rental-type.controller';
import { AdminRentalTypeService } from './rental-type.service';

@Module({
  providers: [RentalTypeRepository, AdminRentalTypeService],
  controllers: [AdminRentalTypeController],
})
export class AdminRentalTypeModule {}
