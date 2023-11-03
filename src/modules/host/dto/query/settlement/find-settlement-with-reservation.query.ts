import { Prisma } from '@prisma/client';
import { PagingDTO, Property } from 'cumuco-nestjs';

export class HostFindSettlementWithReservationQuery extends PagingDTO {
  @Property({
    apiProperty: { type: 'string', nullable: true, description: '결제수단', enum: ['TOSS', 'NAVER', 'KAKAO'] },
  })
  payMethod?: string;

  generateQuery(): Prisma.ReservationFindManyArgs {
    return {
      where: {
        ...(this.payMethod && {
          payMethod: this.getPayMethod(),
        }),
      },
    };
  }

  getPayMethod() {
    if (this.payMethod === 'TOSS') return '토스페이';
    if (this.payMethod === 'NAVER') return '네이버페이';
    if (this.payMethod === 'KAKAO') return '카카오페이';
    else return undefined;
  }
}
