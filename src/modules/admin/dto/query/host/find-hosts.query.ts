import { Prisma } from '@prisma/client';
import { PagingDTO, Property, ToBoolean } from 'cumuco-nestjs';

export class AdminFindHostsQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '이름' } })
  name?: string;

  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '차단 여부' } })
  isBlocked?: boolean;

  generateQuery(): Prisma.HostFindManyArgs {
    return {
      where: {
        ...(this.name && {
          name: {
            contains: this.name,
          },
        }),
        ...(typeof this.isBlocked === 'boolean' && {
          isBlocked: this.isBlocked,
        }),
      },
    };
  }
}
