import { Module } from '@nestjs/common';

import { FileService } from '../file/file.service';

import { ExhibitionController } from './exhibition.controller';
import { ExhibitionRepository } from './exhibition.repository';
import { ExhibitionService } from './exhibition.service';

@Module({
  controllers: [ExhibitionController],
  providers: [ExhibitionRepository, ExhibitionService],
})
export class ExhibitionModule {}
