import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class ReportRepository {
  constructor(private readonly database: PrismaService) {}
}
