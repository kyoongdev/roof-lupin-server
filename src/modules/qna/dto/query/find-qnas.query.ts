import { Prisma } from '@prisma/client';
import { PagingDTO, Property, ToBoolean } from 'cumuco-nestjs';

export class FindQnAsQuery extends PagingDTO {
  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', description: '답변 여부' } })
  isAnswered?: boolean;

  generateQuery(): Prisma.SpaceQnAFindManyArgs {
    return {
      where: {
        ...(typeof this.isAnswered === 'boolean' && {
          answers: {
            ...(this.isAnswered ? { some: {} } : { none: {} }),
          },
        }),
      },
    };
  }
}
