import { Prisma } from '@prisma/client';
import { PagingDTO, Property, ToBoolean } from 'wemacu-nestjs';

export class FindCurationsQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '제목' } })
  title?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '부제목' } })
  subTitle?: string;

  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '메인 노출 여부' } })
  isMain?: boolean;

  generateQuery(): Prisma.CurationFindManyArgs {
    return {
      where: {
        ...(this.title && {
          title: {
            contains: this.title,
          },
        }),
        ...(this.subTitle && {
          subTitle: {
            contains: this.subTitle,
          },
        }),
        ...(typeof this.isMain === 'boolean' && {
          isMain: this.isMain,
        }),
      },
    };
  }
}
