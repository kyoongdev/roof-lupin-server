import { Module } from '@nestjs/common';

import { ServiceController } from './service.controller';
import { ServiceRepository } from './service.repository';
import { ServiceService } from './service.service';

@Module({
  providers: [ServiceRepository, ServiceService],
  controllers: [ServiceController],
})
export class ServiceModule {}
