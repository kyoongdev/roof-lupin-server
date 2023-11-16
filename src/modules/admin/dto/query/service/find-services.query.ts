import { Prisma } from '@prisma/client';
import { Property } from 'cumuco-nestjs';

export class AdminFindServicesQuery {
  @Property({ apiProperty: { type: 'string', description: 'title id', nullable: true } })
  titleId?: string;

  generateQuery(): Prisma.ServiceFindManyArgs {
    return {
      where: {
        ...(this.titleId && {
          serviceTitleId: this.titleId,
        }),
      },
    };
  }
}
