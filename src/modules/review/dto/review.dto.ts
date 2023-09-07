import { Prisma, SpaceReview } from '@prisma/client';
import { Property } from 'cumuco-nestjs';

import { getTimeDiff } from '@/common/date';
import { CommonReview } from '@/interface/review.interface';
import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';
import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';

import { FindReviewsQuery } from './query';
import { ReviewAnswerDTO, ReviewAnswerDTOProps } from './review-answer.dto';
import { ReviewImageDTO, ReviewImageDTOProps } from './review-image.dto';
import { ReviewSpaceDTO, ReviewSpaceDTOProps } from './review-space.dto';

export interface ReviewDTOProps extends Partial<SpaceReview> {
  user: CommonUserProps;
  images: ReviewImageDTOProps[];
  answer?: ReviewAnswerDTOProps;
  space: ReviewSpaceDTOProps;
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

  @Property({ apiProperty: { type: 'boolean', description: '수정 가능 여부' } })
  isEditable: boolean;

  @Property({ apiProperty: { type: ReviewSpaceDTO, description: '공간 정보' } })
  space: ReviewSpaceDTO;

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
    this.isEditable = false;
    this.space = new ReviewSpaceDTO(props.space);
  }

  setIsEditable(userId?: string) {
    this.isEditable = this.user.id === userId && getTimeDiff(new Date(), this.createdAt) < 72;
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

  static generateReviewDTO(review: CommonReview) {
    return {
      ...review,
      answer: review.answers.filter((answer) => !answer.deletedAt).at(-1),
      images: review.images.map((image) => ({
        id: image.id,
        imageId: image.image.id,
        isBest: image.isBest,
        url: image.image.url,
        reviewId: image.spaceReviewId,
      })),
      space: ReviewSpaceDTO.generateReviewSpaceDTO(review.space),
    };
  }

  static generateInclude(answerWhere = {} as Prisma.SpaceReviewAnswerWhereInput) {
    return {
      user: {
        include: {
          socials: true,
          setting: true,
        },
      },
      images: {
        include: {
          image: true,
        },
        orderBy: {
          isBest: 'desc',
        } as Prisma.SpaceReviewImageOrderByWithRelationInput,
      },
      answers: {
        where: answerWhere,
        include: {
          host: true,
        },
      },
      space: {
        include: ReviewSpaceDTO.generateInclude(),
      },
    };
  }
}
