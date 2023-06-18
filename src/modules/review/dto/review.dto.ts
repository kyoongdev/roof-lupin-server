import { Image, Prisma, PrismaClient, SpaceReview, User } from '@prisma/client';
import { Property } from 'wemacu-nestjs';

import { DateDTO } from '@/common';
import { ImageDTO } from '@/modules/file/dto';
import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';

import { FindReviewsQuery } from './query';
import { ReviewAnswerDTO, ReviewAnswerDTOProps } from './review-answer.dto';

export interface ReviewDTOProps extends Partial<SpaceReview> {
  user: CommonUserProps;
  images: { image: Image }[];
  answers: ReviewAnswerDTOProps[];
}

export class ReviewDTO {
  @Property({ apiProperty: { type: 'string' } })
  content: string;

  @Property({
    apiProperty: { type: 'number' },
  })
  score: number;

  @Property({ apiProperty: { type: 'string', isArray: true } })
  images: ImageDTO[];

  @Property({ apiProperty: { type: 'boolean' } })
  isBest: boolean;

  @Property({ apiProperty: { type: CommonUserDTO } })
  user: CommonUserDTO;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  createdAt: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  updatedAt: Date;

  @Property({ apiProperty: { type: ReviewAnswerDTO, isArray: true, description: '리뷰 답변' } })
  reviewAnswers: ReviewAnswerDTO[];

  constructor(props: ReviewDTOProps) {
    this.content = props.content;
    this.score = props.score;
    this.user = new CommonUserDTO(props.user);

    this.images = props.images.map(({ image }) => new ImageDTO(image));

    this.isBest = props.isBest;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.reviewAnswers = props.answers.map((answer) => new ReviewAnswerDTO(answer));
  }

  static async generateQuery(query: FindReviewsQuery, spaceId?: string): Promise<Prisma.SpaceReviewFindManyArgs> {
    const includeIds: string[] = [];
    if (query.hasPhoto && spaceId) {
      const database = new PrismaClient();
      const images = await database.spaceReviewImage.groupBy({
        by: ['spaceReviewId'],
        where: {
          spaceReview: {
            spaceId,
          },
        },
      });
      includeIds.push(...images.map(({ spaceReviewId }) => spaceReviewId));
    }
    return {
      where: {
        ...(query.hasPhoto && {
          OR: includeIds.map((id) => ({
            id,
          })),
        }),
      },
      orderBy: {
        ...(query.sort === 'CREATED_AT' && {
          createdAt: 'desc',
        }),
        ...(query.sort === 'SCORE_HIGH' && {
          score: 'desc',
        }),
        ...(query.sort === 'SCORE_LOW' && {
          score: 'asc',
        }),
      },
    };
  }
}
