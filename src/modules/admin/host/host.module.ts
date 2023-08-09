import { Module } from '@nestjs/common';

import { EncryptProvider } from '@/common/encrypt';
import { HostRepository } from '@/modules/host/host.repository';

import { AdminHostController } from './host.controller';
import { AdminHostService } from './host.service';

@Module({
  providers: [AdminHostService, HostRepository, EncryptProvider],
  controllers: [AdminHostController],
  exports: [AdminHostService, HostRepository, EncryptProvider],
})
export class AdminHostModule {}
