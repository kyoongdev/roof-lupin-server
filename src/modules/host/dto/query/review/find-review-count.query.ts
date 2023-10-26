import { Prisma } from '@prisma/client';
import { Property, ToBoolean } from 'cumuco-nestjs';

export class HostFindReviewCountQuery {
  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '답변여부' } })
  isAnswered?: boolean;

  generateQuery(): Prisma.SpaceReviewWhereInput {
    return {
      ...(typeof this.isAnswered === 'boolean' &&
        !this.isAnswered && {
          answers: {
            none: {},
          },
        }),
    };
  }
}
