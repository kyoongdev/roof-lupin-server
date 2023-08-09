import { Module } from '@nestjs/common';

import { ServiceRepository } from '@/modules/service/service.repository';

import { AdminServiceController } from './service.controller';
import { AdminServiceService } from './service.service';

@Module({
  providers: [AdminServiceService, ServiceRepository],
  exports: [AdminServiceService, ServiceRepository],
  controllers: [AdminServiceController],
})
export class AdminServiceModule {}
