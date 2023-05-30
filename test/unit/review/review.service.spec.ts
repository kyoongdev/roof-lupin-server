import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '@/database/prisma.service';
import { UpdateReviewDTO } from '@/modules/review/dto';
import { ReviewRepository } from '@/modules/review/review.repository';
import { ReviewService } from '@/modules/review/review.service';
import { SpaceRepository } from '@/modules/space/space.repository';

import { seedSpace } from '../seed/space';

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
    await seedSpace(database);
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

      const updatedReview = await service.updateReview(
        newReview.id,
        user.id,
        new UpdateReviewDTO({
          content: 'hello',
        })
      );
    });
  });

  afterEach(async () => {
    await database.space.deleteMany({});
    await database.host.deleteMany({});
    await database.user.deleteMany({});
    await database.spaceReview.deleteMany({});
  });
});
