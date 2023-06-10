import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { LocationDTO } from './dto';

@Injectable()
export class LocationRepository {
  constructor(private readonly database: PrismaService) {}
}
