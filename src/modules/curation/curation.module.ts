import { Module } from '@nestjs/common';

import { CurationController } from './curation.controller';
import { CurationRepository } from './curation.repository';
import { CurationService } from './curation.service';

@Module({
  controllers: [CurationController],
  providers: [CurationService, CurationRepository],
})
export class CurationModule {}
