import { Module } from '@nestjs/common';

import { FCMEvent } from '@/event/fcm';
import { ExhibitionRepository } from '@/modules/exhibition/exhibition.repository';
import { FileService } from '@/modules/file/file.service';

import { AdminExhibitionController } from './exhibition.controller';
import { AdminExhibitionService } from './exhibition.service';

@Module({
  providers: [AdminExhibitionService, FileService, ExhibitionRepository, FCMEvent],
  controllers: [AdminExhibitionController],
  exports: [AdminExhibitionService, FileService, ExhibitionRepository, FCMEvent],
})
export class AdminExhibitionModule {}
