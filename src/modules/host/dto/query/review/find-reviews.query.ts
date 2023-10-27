import { Prisma } from '@prisma/client';
import { Property, ToBoolean } from 'cumuco-nestjs';

export class HostFindReviewsQuery {
  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', description: '답변 여부', nullable: true } })
  isAnswered?: boolean;

  public generateQuery(): Prisma.SpaceReviewWhereInput {
    return {
      answers: {
        ...(typeof this.isAnswered === 'boolean' &&
          !this.isAnswered && {
            none: {},
          }),
      },
    };
  }
}
