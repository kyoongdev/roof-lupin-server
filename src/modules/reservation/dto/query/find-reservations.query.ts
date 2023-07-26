import { Prisma } from '@prisma/client';
import { PagingDTO, Property, ToBoolean } from 'cumuco-nestjs';

export class FindReservationQuery extends PagingDTO {
  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', description: '승인 여부' } })
  isApproved?: boolean;

  generateQuery(): Prisma.ReservationFindManyArgs {
    return {
      where: {
        ...(typeof this.isApproved === 'boolean' && {
          isApproved: this.isApproved,
        }),
      },
    };
  }
}
