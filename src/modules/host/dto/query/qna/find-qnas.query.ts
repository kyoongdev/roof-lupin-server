import { Prisma } from '@prisma/client';
import { PagingDTO, Property, ToBoolean } from 'cumuco-nestjs';

export class HostFindQnAsQuery extends PagingDTO {
  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '답변여부' } })
  isAnswered?: boolean;

  generateQuery(): Prisma.SpaceQnAWhereInput {
    return {
      ...(typeof this.isAnswered === 'boolean' && this.isAnswered
        ? {
            answers: {
              some: {
                deletedAt: null,
              },
            },
          }
        : {
            answers: {
              none: {},
            },
          }),
    };
  }
}
