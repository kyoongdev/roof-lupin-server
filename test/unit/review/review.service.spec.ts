import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '@/database/prisma.service';
import { ReviewRepository } from '@/modules/review/review.repository';
import { ReviewService } from '@/modules/review/review.service';
import { SpaceRepository } from '@/modules/space/space.repository';

describe('ReviewService', () => {
  let service: ReviewService;
  let database: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [ReviewService, PrismaService, ReviewRepository, SpaceRepository],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    database = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    const host = await database.host.create({
      data: {
        name: 'testHost',
        userId: 'testHost',
      },
    });

    await database.user.create({
      data: {
        nickname: 'testUser',
      },
    });
    for (let i = 0; i < 100; i++) {
      await database.space.create({
        data: {
          buildingType: 1,
          description: 'test',
          title: `테스트 공간${i + 1}`,
          facilityIntroduction: 'facilityIntroduction',
          maxUser: 20,
          minUser: 1,
          overflowUserCost: i * 1000,
          spaceType: 1,
          size: i + 20,
          spaceIntroduction: 'spaceIntroduction',
          host: {
            connect: {
              id: host.id,
            },
          },
        },
      });
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Review Update', () => {
    it('리뷰 수정 (성공)', async () => {
      const space = await database.space.findFirst({});
      const user = await database.user.findFirst({});

      const newReview = await database.spaceReview.create({
        data: {
          score: 5,
          content: 'test',
          space: {
            connect: {
              id: space.id,
            },
          },
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      expect(newReview).toBeDefined();
      expect(newReview.userId).toEqual(user.id);
    });
  });

  afterEach(async () => {
    await database.space.deleteMany({});
    await database.host.deleteMany({});
    await database.user.deleteMany({});
    await database.spaceReview.deleteMany({});
  });
});
