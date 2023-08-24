import { Prisma } from '@prisma/client';
import { PagingDTO, Property, ToBoolean } from 'cumuco-nestjs';

export class FindReservationQuery extends PagingDTO {
  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', description: '승인 여부' } })
  isApproved?: boolean;

  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', description: '취소 여부' } })
  isCanceled?: boolean;

  generateQuery(): Prisma.ReservationFindManyArgs {
    return {
      where: {
        ...(typeof this.isApproved === 'boolean' && {
          isApproved: this.isApproved,
        }),
        ...(typeof this.isApproved === 'boolean' && {
          isCanceled: this.isCanceled,
        }),
      },
    };
  }
}
