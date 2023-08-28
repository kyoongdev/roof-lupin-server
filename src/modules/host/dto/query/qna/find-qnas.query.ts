import { Prisma } from '@prisma/client';
import { PagingDTO, Property, ToBoolean } from 'cumuco-nestjs';

export class HostFindQnAsQuery extends PagingDTO {
  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '답변여부' } })
  isAnswered?: boolean;

  generateQuery(): Prisma.SpaceQnAFindManyArgs {
    return {
      where: {
        ...(typeof this.isAnswered === 'boolean' && {
          answers: this.isAnswered
            ? {
                some: {},
              }
            : {
                none: {},
              },
        }),
      },
    };
  }
}
