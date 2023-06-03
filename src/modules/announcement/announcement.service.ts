import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class AnnouncementService {
  constructor(private readonly database: PrismaService) {}
}
