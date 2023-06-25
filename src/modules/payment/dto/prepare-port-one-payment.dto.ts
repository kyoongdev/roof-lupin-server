import { Property } from 'wemacu-nestjs';

export interface PortOnePreparePaymentDTOProps {
  merchant_uid: string;
  amount: number;
}

export class PortOnePreparePaymentDTO {
  @Property({ apiProperty: { type: 'string', description: '가맹점 주문번호' } })
  merchant_uid: string;

  @Property({ apiProperty: { type: 'number', description: '결제금액' } })
  amount: number;

  constructor(props: PortOnePreparePaymentDTOProps) {
    this.merchant_uid = props.merchant_uid;
    this.amount = props.amount;
  }
}
