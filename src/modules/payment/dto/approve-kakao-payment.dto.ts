import { Property } from 'wemacu-nestjs';

export interface ApproveKakaoPaymentDTOProps {
  orderId: string;
  orderResultId: string;
  pg_token: string;
}

export class ApproveKakaoPaymentDTO {
  @Property({ apiProperty: { type: 'string', description: '주문번호' } })
  orderId: string;

  @Property({ apiProperty: { type: 'string', description: '주문결과번호' } })
  orderResultId: string;

  @Property({ apiProperty: { type: 'string', description: '결제승인 토큰' } })
  pg_token: string;

  constructor(props?: ApproveKakaoPaymentDTOProps) {
    if (props) {
      this.orderId = props.orderId;
      this.orderResultId = props.orderResultId;
      this.pg_token = props.pg_token;
    }
  }
}
