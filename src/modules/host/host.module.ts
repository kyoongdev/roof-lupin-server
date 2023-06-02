import { Module } from '@nestjs/common';

import { HostController } from './host.controller';
import { HostRepository } from './host.repository';
import { HostService } from './host.service';

@Module({
  providers: [HostService, HostRepository],
  controllers: [HostController],
})
export class HostModule {}
