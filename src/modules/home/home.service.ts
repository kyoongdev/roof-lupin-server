import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { SpaceRepository } from '../space/space.repository';

@Injectable()
export class HomeService {
  constructor(private readonly database: PrismaService, private readonly spaceRepository: SpaceRepository) {}
}
