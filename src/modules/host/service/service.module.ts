import { Module } from '@nestjs/common';

import { ServiceRepository } from '@/modules/service/service.repository';

import { HostServiceController } from './service.controller';
import { HostServiceService } from './service.service';

@Module({
  providers: [HostServiceService, ServiceRepository],
  exports: [HostServiceService, ServiceRepository],
  controllers: [HostServiceController],
})
export class HostServiceModule {}
