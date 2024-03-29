import { Property } from 'cumuco-nestjs';

export interface CreateSettlementDTOProps {
  year: number;
  month: number;
  hostId: string;
  settlementCost: number;
  totalCost: number;
  vatCost: number;
  discountCost: number;
  originalCost: number;
  lupinCost: number;
  lupinVatCost: number;
  reservationIds?: string[];
}

export class CreateSettlementDTO {
  @Property({ apiProperty: { type: 'number', description: '정산 연도' } })
  year: number;

  @Property({ apiProperty: { type: 'number', description: '정산 월' } })
  month: number;

  @Property({ apiProperty: { type: 'string', description: '호스트 Id' } })
  hostId: string;

  @Property({ apiProperty: { type: 'number', description: '정산 금액' } })
  settlementCost: number;

  @Property({ apiProperty: { type: 'number', description: '총 결제 금액' } })
  totalCost: number;

  @Property({ apiProperty: { type: 'number', description: 'VAT 금액' } })
  vatCost: number;

  @Property({ apiProperty: { type: 'number', description: '할인 금액' } })
  discountCost: number;

  @Property({ apiProperty: { type: 'number', description: '총액 - 할인가가 적용되지 않은 금액' } })
  originalCost: number;

  @Property({ apiProperty: { type: 'number', description: '루프루팡 수수료' } })
  lupinCost: number;

  @Property({ apiProperty: { type: 'number', description: '루프루팡 수수료 vat' } })
  lupinVatCost: number;

  @Property({ apiProperty: { type: 'string', nullable: true, isArray: true, description: '예약 ids' } })
  reservationIds?: string[];

  constructor(props?: CreateSettlementDTOProps) {
    if (props) {
      this.year = props.year;
      this.month = props.month;
      this.hostId = props.hostId;
      this.settlementCost = props.settlementCost;
      this.lupinVatCost = props.lupinVatCost;
      this.totalCost = props.totalCost;
      this.vatCost = props.vatCost;
      this.lupinCost = props.lupinCost;
      this.discountCost = props.discountCost;
      this.originalCost = props.originalCost;
      this.reservationIds = props.reservationIds;
    }
  }
}
