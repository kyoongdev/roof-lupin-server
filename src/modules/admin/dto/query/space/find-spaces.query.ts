import { Prisma } from '@prisma/client';
import { PagingDTO, Property, ToBoolean } from 'wemacu-nestjs';

export class AdminFindSpacesQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '공간 이름' } })
  title?: string;

  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '공간 승인 여부' } })
  isApproved?: boolean;

  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '공간 노출 여부' } })
  isPublic?: boolean;

  generateQuery(): Prisma.SpaceFindManyArgs {
    return {
      where: {
        ...(this.title && {
          title: {
            contains: this.title,
          },
        }),
      },
    };
  }
}
