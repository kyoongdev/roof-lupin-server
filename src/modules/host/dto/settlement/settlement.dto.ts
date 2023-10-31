import { Prisma } from '@prisma/client';
import { Property } from 'cumuco-nestjs';

import { LUPIN_CHARGE } from '@/common/constants';
import { getVatCost } from '@/common/vat';

import { FindSettlementsQuery } from './query';

export interface SettlementDTOProps {
  id: string;
  year: number;
  month: number;
  settlementCost: number;
  totalCost: number;
  vatCost: number;
  lupinCost: number;
  lupinVatCost: number;
  discountCost: number;
  originalCost: number;
  isPayed: boolean;
  deletedAt?: Date;
}

export class SettlementDTO {
  @Property({ apiProperty: { type: 'string', description: '정산 Id' } })
  id: string;

  @Property({ apiProperty: { type: 'number', description: '정산 연도' } })
  year: number;

  @Property({ apiProperty: { type: 'number', description: '정산 월' } })
  month: number;

  @Property({ apiProperty: { type: 'number', description: '최종 정산 금액' } })
  settlementCost: number;

  @Property({ apiProperty: { type: 'number', description: '최종 매출 금액' } })
  totalCost: number;

  @Property({ apiProperty: { type: 'number', description: 'VAT 금액' } })
  vatCost: number;

  @Property({ apiProperty: { type: 'number', description: '할인 금액' } })
  discountCost: number;

  @Property({ apiProperty: { type: 'number', description: '총액 -> 할인가가 적용되지 않은 금액' } })
  originalCost: number;

  @Property({ apiProperty: { type: 'boolean', description: '결제 여부' } })
  isPayed: boolean;

  @Property({ apiProperty: { type: 'number', description: '루프루팡 수수료' } })
  lupinCost: number;

  @Property({ apiProperty: { type: 'number', description: '루프루팡 수수료 vat' } })
  lupinVatCost: number;

  @Property({ apiProperty: { type: 'string', format: 'date-time', nullable: true, description: '삭제일' } })
  deletedAt?: Date;

  constructor(props: SettlementDTOProps) {
    this.id = props.id;
    this.year = props.year;
    this.month = props.month;
    this.settlementCost = props.settlementCost;
    this.totalCost = props.totalCost;
    this.vatCost = props.vatCost;
    this.discountCost = props.discountCost;
    this.originalCost = props.originalCost;
    this.isPayed = props.isPayed;
    this.lupinCost = props.lupinCost;
    this.lupinVatCost = props.lupinVatCost;
    this.deletedAt = props.deletedAt;
  }

  static generateQuery(query: FindSettlementsQuery): Prisma.SettlementFindManyArgs {
    return {
      where: {
        ...(query.year && {
          year: query.year,
        }),
        ...(query.month && {
          month: query.month,
        }),
        ...(query.day && {
          day: query.day,
        }),
      },
    };
  }

  getNewSettlementCostInfo(oldTotalCost: number, newTotalCost: number, refundCost?: number) {
    const oldCost = this.getSettlementCostInfo(oldTotalCost);
    const newCost = this.getSettlementCostInfo(newTotalCost);

    return {
      lupinCost: this.lupinCost - oldCost.lupinCost + newCost.lupinCost,
      settlementCost: this.settlementCost - oldCost.settlementCost + newCost.settlementCost,
      vatCost: this.vatCost - oldCost.vatCost + newCost.vatCost,
      lupinVatCost: this.lupinVatCost - oldCost.lupinVatCost + newCost.lupinVatCost,
      originalCost: this.originalCost - (refundCost ?? 0),
      totalCost: this.totalCost - oldTotalCost + newTotalCost,
    };
  }

  getSettlementCostInfo(cost: number) {
    const lupinCost = cost * LUPIN_CHARGE;
    const lupinVatCost = getVatCost(lupinCost);
    const settlementCost = cost - lupinCost;
    const vatCost = getVatCost(settlementCost);
    return {
      lupinCost,
      lupinVatCost,
      settlementCost,
      vatCost,
    };
  }
}
