import { Module } from '@nestjs/common';

import { FileService } from '@/modules/file/file.service';

import { AdminTermsController } from './terms.controller';
import { AdminTermsService } from './terms.service';

@Module({
  providers: [AdminTermsService, FileService],
  exports: [AdminTermsService, FileService],
  controllers: [AdminTermsController],
})
export class AdminTermsModule {}
