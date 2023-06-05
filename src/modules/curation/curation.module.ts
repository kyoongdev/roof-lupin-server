import { Module } from '@nestjs/common';

import { CurationController } from './curation.controller';
import { CurationService } from './curation.service';

@Module({
  controllers: [CurationController],
  providers: [CurationService],
})
export class CurationModule {}
