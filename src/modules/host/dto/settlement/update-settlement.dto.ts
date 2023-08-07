import { Property } from 'cumuco-nestjs';

export interface UpdateSettlementDTOProps {
  year?: string;
  month?: string;
  day?: string;
  settlementCost?: number;
  totalCost?: number;
  vatCost?: number;
  discountCost?: number;
  originalCost?: number;
  lupinCost?: number;
  lupinVatCost?: number;
  reservationIds?: string[];
}

export class UpdateSettlementDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '정산 연도' } })
  year?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '정산 월' } })
  month?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '정산 일' } })
  day?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '정산 금액' } })
  settlementCost?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '총 결제 금액' } })
  totalCost?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: 'VAT 금액' } })
  vatCost?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '할인 금액' } })
  discountCost?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '총액 - 할인가가 적용되지 않은 금액' } })
  originalCost?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '루프루팡 수수료' } })
  lupinCost?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '루프루팡 수수료 vat' } })
  lupinVatCost?: number;

  @Property({ apiProperty: { type: 'string', nullable: true, isArray: true, description: '예약 ids' } })
  reservationIds?: string[];

  constructor(props?: UpdateSettlementDTOProps) {
    if (props) {
      this.year = props.year;
      this.month = props.month;
      this.day = props.day;
      this.settlementCost = props.settlementCost;
      this.totalCost = props.totalCost;
      this.vatCost = props.vatCost;
      this.discountCost = props.discountCost;
      this.originalCost = props.originalCost;
      this.reservationIds = props.reservationIds;
      this.lupinCost = props.lupinCost;
      this.lupinVatCost = props.lupinVatCost;
    }
  }
}
