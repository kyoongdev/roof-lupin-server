import { Module } from '@nestjs/common';

import { HostController } from './host.controller';
import { HostService } from './host.service';

@Module({
  providers: [HostService],
  controllers: [HostController],
})
export class HostModule {}
