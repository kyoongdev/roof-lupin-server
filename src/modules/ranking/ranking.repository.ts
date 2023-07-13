import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class RankingRepository {
  constructor(private readonly database: PrismaService) {}
}
