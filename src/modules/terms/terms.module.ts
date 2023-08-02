import { Module } from '@nestjs/common';

import { FileService } from '../file/file.service';

import { TermsController } from './terms.controller';
import { TermsService } from './terms.service';

@Module({
  providers: [FileService, TermsService],
  controllers: [TermsController],
})
export class TermsModule {}
