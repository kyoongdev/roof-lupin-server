import { Image, Prisma, PrismaClient, SpaceReview, User } from '@prisma/client';
import { Property } from 'cumuco-nestjs';

import { DateDTO } from '@/common';
import { ImageDTO } from '@/modules/file/dto';
import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';

import { FindReviewsQuery } from './query';
import { ReviewAnswerDTO, ReviewAnswerDTOProps } from './review-answer.dto';
import { ReviewImageDTO, ReviewImageDTOProps } from './review-image.dto';

export interface ReviewDTOProps extends Partial<SpaceReview> {
  user: CommonUserProps;
  images: ReviewImageDTOProps[];
  answer?: ReviewAnswerDTOProps;
}

export class ReviewDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  content: string;

  @Property({
    apiProperty: { type: 'number' },
  })
  score: number;

  @Property({ apiProperty: { type: ReviewImageDTO, isArray: true } })
  images: ReviewImageDTO[];

  @Property({ apiProperty: { type: CommonUserDTO } })
  user: CommonUserDTO;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  createdAt: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  updatedAt: Date;

  @Property({ apiProperty: { type: 'string', description: '예약 id' } })
  reservationId: string;

  @Property({ apiProperty: { type: ReviewAnswerDTO, nullable: true, description: '리뷰 답변' } })
  answer: ReviewAnswerDTO;

  constructor(props: ReviewDTOProps) {
    this.id = props.id;
    this.content = props.content;
    this.score = props.score;
    this.user = new CommonUserDTO(props.user);
    this.images = props.images.map((image) => new ReviewImageDTO(image));
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.reservationId = props.reservationId;
    this.answer = props.answer ? new ReviewAnswerDTO(props.answer) : null;
  }

  static async generateQuery(query: FindReviewsQuery, spaceId?: string): Promise<Prisma.SpaceReviewFindManyArgs> {
    return {
      where: {
        ...(query.hasPhoto && {
          images: {
            some: {},
          },
        }),
      },
      ...(query.sort && {
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
      }),
    };
  }

  static generateInclude() {
    return {
      user: {
        include: {
          socials: true,
        },
      },
      images: {
        include: {
          image: true,
        },
      },
      answers: {
        where: {
          deletedAt: null,
        },
        include: {
          host: true,
        },
      },
    };
  }
}
