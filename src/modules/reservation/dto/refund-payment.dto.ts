import { Property } from 'wemacu-nestjs';

export interface RefundPaymentDTOProps {
  refundCost: number;
}

export class RefundPaymentDTO {
  @Property({ apiProperty: { type: 'string', description: '환불금액' } })
  refundCost: number;

  constructor(props: RefundPaymentDTOProps) {
    this.refundCost = props.refundCost;
  }
}
