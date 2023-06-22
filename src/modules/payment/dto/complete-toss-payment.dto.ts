import { Property } from 'wemacu-nestjs';

export interface ConfirmTossPaymentDTOProps {
  paymentKey: string;
}

export class ConfirmTossPaymentDTO {
  @Property({ apiProperty: { type: 'string', description: '결제키' } })
  paymentKey: string;

  constructor(props: ConfirmTossPaymentDTOProps) {
    this.paymentKey = props.paymentKey;
  }
}
