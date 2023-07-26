import { Module } from '@nestjs/common';

import { RankingController } from './ranking.controller';
import { RankingRepository } from './ranking.repository';
import { RankingService } from './ranking.service';

@Module({
  providers: [RankingService, RankingRepository],
  controllers: [RankingController],
})
export class RankingModule {}
