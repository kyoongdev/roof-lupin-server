import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class FaqService {
  constructor(private readonly database: PrismaService) {}
}
