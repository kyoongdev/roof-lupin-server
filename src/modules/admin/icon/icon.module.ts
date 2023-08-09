import { Module } from '@nestjs/common';

import { FileService } from '@/modules/file/file.service';

import { AdminIconController } from './icon.controller';
import { IconRepository } from './icon.repository';
import { AdminIconService } from './icon.service';

@Module({
  providers: [AdminIconService, IconRepository, FileService],
  exports: [AdminIconService, IconRepository, FileService],
  controllers: [AdminIconController],
})
export class AdminIconModule {}
