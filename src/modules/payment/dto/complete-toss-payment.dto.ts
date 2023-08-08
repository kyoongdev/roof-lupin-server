import { Property } from 'cumuco-nestjs';

import { CreatePaymentDTO, CreatePaymentDTOProps } from '@/modules/reservation/dto';

export interface ConfirmTossPaymentDTOProps {
  paymentKey: string;
  orderId: string;
  amount: number;
  paymentInfo: CreatePaymentDTOProps;
}

export class ConfirmTossPaymentDTO {
  @Property({ apiProperty: { type: 'string', description: '결제키' } })
  paymentKey: string;

  @Property({ apiProperty: { type: 'string', description: '주문번호' } })
  orderId: string;

  @Property({ apiProperty: { type: 'number', description: '결제된 금액' } })
  amount: number;

  @Property({ apiProperty: { type: CreatePaymentDTO, description: '결제 정보' } })
  paymentInfo: CreatePaymentDTO;

  constructor(props?: ConfirmTossPaymentDTOProps) {
    if (props) {
      this.paymentKey = props.paymentKey;
      this.orderId = props.orderId;
      this.amount = props.amount;
      this.paymentInfo = new CreatePaymentDTO(props.paymentInfo);
    }
  }
}
