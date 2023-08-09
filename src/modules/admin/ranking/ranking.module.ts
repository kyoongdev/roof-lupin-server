import { Module } from '@nestjs/common';

import { RankingRepository } from '@/modules/ranking/ranking.repository';

import { AdminRankingController } from './ranking.controller';
import { AdminRankingService } from './ranking.service';

@Module({
  providers: [AdminRankingService, RankingRepository],
  exports: [AdminRankingService, RankingRepository],
  controllers: [AdminRankingController],
})
export class AdminRankingModule {}
