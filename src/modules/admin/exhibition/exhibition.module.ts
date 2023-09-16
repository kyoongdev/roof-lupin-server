import { Module } from '@nestjs/common';

import { MessageEvent } from '@/event/message';
import { ExhibitionRepository } from '@/modules/exhibition/exhibition.repository';
import { FileService } from '@/modules/file/file.service';

import { AdminExhibitionController } from './exhibition.controller';
import { AdminExhibitionService } from './exhibition.service';

@Module({
  providers: [AdminExhibitionService, FileService, ExhibitionRepository, MessageEvent],
  controllers: [AdminExhibitionController],
  exports: [AdminExhibitionService, FileService, ExhibitionRepository, MessageEvent],
})
export class AdminExhibitionModule {}
