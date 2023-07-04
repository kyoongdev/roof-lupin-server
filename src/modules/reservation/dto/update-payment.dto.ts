import { Property } from 'wemacu-nestjs';

export enum PayMethod {
  PORT_ONE = 1,
  TOSS_PAY,
  KAKAO_PAY,
}

export interface UpdatePaymentDTOProps {
  totalCost?: number;
  vatCost?: number;
  discountCost?: number;
  originalCost?: number;
  orderId?: string;
  orderResultId?: string;
  payMethod?: PayMethod;
  payedAt?: Date;
  refundCost?: number;
}

export class UpdatePaymentDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '결제 비용' } })
  totalCost?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: 'VAT 금액' } })
  vatCost?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '할인 금액' } })
  discountCost?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '할인가가 적용되지 않은 금액' } })
  originalCost?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '주문번호' } })
  orderId?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '주문 결과 번호' } })
  orderResultId?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '결제 방식' } })
  payMethod?: PayMethod;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '결제일' } })
  payedAt?: Date;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '환불 금액' } })
  refundCost?: number;

  constructor(props?: UpdatePaymentDTOProps) {
    if (props) {
      this.totalCost = props.totalCost;
      this.vatCost = props.vatCost;
      this.discountCost = props.discountCost;
      this.originalCost = props.originalCost;
      this.orderId = props.orderId;
      this.orderResultId = props.orderResultId;
      this.payMethod = props.payMethod;
      this.payedAt = props.payedAt;
    }
  }
}
