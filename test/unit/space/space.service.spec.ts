import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '@/database/prisma.service';
import { SpaceRepository } from '@/modules/space/space.repository';
import { SpaceService } from '@/modules/space/space.service';
import { seedDatabase } from '@/seed';

describe('SpaceService', () => {
  let service: SpaceService;
  let database: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [SpaceService, PrismaService, SpaceRepository],
    }).compile();

    service = module.get<SpaceService>(SpaceService);
    database = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('test db', async () => {
    await seedDatabase(database);

    const rentalType = await database.rentalType.groupBy({
      by: ['spaceId'],
      _min: {
        baseCost: true,
      },
    });

    await Promise.all(
      rentalType.map(async (rental) => {
        const rentalTypes = await database.rentalType.findMany({
          where: {
            spaceId: rental.spaceId,
          },
        });
      })
    );
  });
});
