import { Module } from '@nestjs/common';

import { CurationRepository } from '@/modules/curation/curation.repository';

import { AdminCurationController } from './curation.controller';
import { AdminCurationService } from './curation.service';

@Module({
  providers: [CurationRepository, AdminCurationService],
  controllers: [AdminCurationController],
  exports: [CurationRepository, AdminCurationService],
})
export class AdminCurationModule {}
