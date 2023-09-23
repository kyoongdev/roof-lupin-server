import { Module } from '@nestjs/common';

import { ServiceRepository } from '@/modules/service/service.repository';

import { IconRepository } from '../icon/icon.repository';

import { AdminServiceController } from './service.controller';
import { AdminServiceService } from './service.service';

@Module({
  providers: [AdminServiceService, ServiceRepository, IconRepository],
  exports: [AdminServiceService, ServiceRepository, IconRepository],
  controllers: [AdminServiceController],
})
export class AdminServiceModule {}
