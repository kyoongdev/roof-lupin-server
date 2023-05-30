import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { Space, SpaceReview, User } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';
import { UpdateReviewDTO } from '@/modules/review/dto';
import {
  REVIEW_DELETE_FORBIDDEN,
  REVIEW_ERROR_CODE,
  REVIEW_UPDATE_FORBIDDEN,
} from '@/modules/review/exception/errorCode';
import { ReviewException } from '@/modules/review/exception/review.exception';
import { ReviewRepository } from '@/modules/review/review.repository';
import { ReviewService } from '@/modules/review/review.service';
import { SpaceRepository } from '@/modules/space/space.repository';

import { seedSpace } from '../seed/space';

describe('ReviewService', () => {
  let service: ReviewService;
  let database: PrismaService;

  beforeAll(async () => {
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
    let newReview: SpaceReview;
    let space: Space;
    let user: User;
    beforeEach(async () => {
      space = await database.space.findFirst({});
      user = await database.user.findFirst({});

      newReview = await database.spaceReview.create({
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
    });
    it('리뷰 수정 (성공)', async () => {
      expect(newReview).toBeDefined();
      expect(newReview.userId).toEqual(user.id);

      await service.updateReview(
        newReview.id,
        user.id,
        new UpdateReviewDTO({
          content: 'hello',
        })
      );
      const updatedReview = await service.findReview(newReview.id);

      expect(updatedReview).toBeDefined();
      expect(updatedReview.userId).toEqual(user.id);
      expect(updatedReview.content).toEqual('hello');
      expect(updatedReview.score).toEqual(5);
    });

    it('리뷰 수정 (실패)', async () => {
      expect(newReview).toBeDefined();

      expect(
        async () => await service.updateReview(newReview.id, 'wrongId', new UpdateReviewDTO({ content: 'hello' }))
      ).rejects.toThrowError(new ReviewException(REVIEW_ERROR_CODE.FORBIDDEN(REVIEW_UPDATE_FORBIDDEN)));
    });

    it('리뷰 삭제 (성공)', async () => {
      expect(newReview).toBeDefined();
      expect(newReview.userId).toEqual(user.id);

      await service.deleteReview(newReview.id, user.id);

      expect(async () => await service.findReview(newReview.id)).rejects.toThrowError(
        new ReviewException(REVIEW_ERROR_CODE.NOT_FOUND())
      );
    });

    it('리뷰 삭제 (실패)', async () => {
      expect(newReview).toBeDefined();
      expect(newReview.userId).toEqual(user.id);

      expect(async () => await service.deleteReview(newReview.id, 'wrongId')).rejects.toThrowError(
        new ReviewException(REVIEW_ERROR_CODE.FORBIDDEN(REVIEW_DELETE_FORBIDDEN))
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
