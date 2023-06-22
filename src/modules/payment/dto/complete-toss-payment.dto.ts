import { Property } from 'wemacu-nestjs';

export interface ConfirmTossPaymentDTOProps {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export class ConfirmTossPaymentDTO {
  @Property({ apiProperty: { type: 'string', description: '결제키' } })
  paymentKey: string;

  @Property({ apiProperty: { type: 'string', description: '주문번호' } })
  orderId: string;

  @Property({ apiProperty: { type: 'number', description: '결제된 금액' } })
  amount: number;

  constructor(props: ConfirmTossPaymentDTOProps) {
    this.paymentKey = props.paymentKey;
    this.orderId = props.orderId;
    this.amount = props.amount;
  }
}
