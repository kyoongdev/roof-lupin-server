import { Module } from '@nestjs/common';

import { CategoryRepository } from '@/modules/category/category.repository';
import { ExhibitionRepository } from '@/modules/exhibition/exhibition.repository';
import { RankingRepository } from '@/modules/ranking/ranking.repository';

import { AdminHomeController } from './home.controller';
import { AdminHomeService } from './home.service';

@Module({
  providers: [AdminHomeService, CategoryRepository, ExhibitionRepository, RankingRepository],
  exports: [AdminHomeService, CategoryRepository, ExhibitionRepository, RankingRepository],
  controllers: [AdminHomeController],
})
export class AdminHomeModule {}
