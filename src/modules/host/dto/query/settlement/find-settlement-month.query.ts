import { Prisma } from '@prisma/client';
import { Property, ToBoolean } from 'cumuco-nestjs';

export class HostFindSettlementMonthQuery {
  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', description: '정산 여부' } })
  isPayed?: boolean;

  generateQuery(): Prisma.SettlementFindManyArgs {
    return {
      where: {
        ...(typeof this.isPayed === 'boolean' && {
          isPayed: this.isPayed,
        }),
      },
    };
  }
}
