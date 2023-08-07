import { PrismaService } from '@/database/prisma.service';
import { HostReviewService } from '@/modules/host/review/review.service';
import { ReviewRepository } from '@/modules/review/review.repository';
import { ReviewService } from '@/modules/review/review.service';
import { seedDatabase } from '@/seed';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

describe('HostReviewService', () => {
  let service: HostReviewService;
  let database: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [ReviewRepository, PrismaService, HostReviewService],
    }).compile();

    service = module.get<HostReviewService>(HostReviewService);
    database = module.get<PrismaService>(PrismaService);
    await database.$connect();
    await seedDatabase(database);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(database).toBeDefined();
  });

  describe('리뷰 답변 쿼리 작동 여부', () => {
    it('리뷰 답변 안된 거 불러오기', async () => {
      const host = await database.host.findUnique({
        where: {
          email: '9898junjun2@gmail.com',
        },
      });
      const reviews = await service.findReviews({
        where: {
          space: {
            hostId: host.id,
          },
        },
      });

      await service.createReviewAnswer(reviews[0].id, host.id, {
        content: 'test',
      });

      const reviewNotAnswered = await service.findReviews({
        where: {
          answers: {
            none: {},
          },
        },
      });

      const reviewAnswered = await service.findReviews({
        where: {
          answers: {
            some: {},
          },
        },
      });

      expect(reviews.length - reviewNotAnswered.length).toBe(1);
      expect(reviewAnswered.length + reviewNotAnswered.length).toBe(reviews.length);
    });
  });

  afterAll(async () => {
    await database.spaceReviewAnswer.deleteMany({});
  });
});
