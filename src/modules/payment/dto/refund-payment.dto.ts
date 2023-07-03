import { Property } from 'wemacu-nestjs';

export interface RefundPaymentDTOProps {
  reservationId: string;
  merchant_uid?: string;
}

export class RefundPaymentDTO {
  @Property({ apiProperty: { type: 'string', description: '예약 id' } })
  reservationId: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '주문번호 (포트원) ' } })
  merchant_uid?: string;

  constructor(props?: RefundPaymentDTOProps) {
    if (props) {
      this.reservationId = props.reservationId;
      this.merchant_uid = props.merchant_uid;
    }
  }
}
