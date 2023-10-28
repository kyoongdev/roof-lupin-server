import { Prisma } from '@prisma/client';
import { Property, ToBoolean } from 'cumuco-nestjs';

export class HostFindQnACountQuery {
  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '답변여부' } })
  isAnswered?: boolean;

  generateQuery(): Prisma.SpaceQnAWhereInput {
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
