import { Property } from 'cumuco-nestjs';

export interface RefundPaymentDTOProps {
  reservationId: string;
  merchant_uid?: string;
  cancelReason: string;
}

export class RefundPaymentDTO {
  @Property({ apiProperty: { type: 'string', description: '예약 id' } })
  reservationId: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '주문번호 (포트원) ' } })
  merchant_uid?: string;

  @Property({ apiProperty: { type: 'string', description: '취소 사유' } })
  cancelReason: string;

  constructor(props?: RefundPaymentDTOProps) {
    if (props) {
      this.reservationId = props.reservationId;
      this.merchant_uid = props.merchant_uid;
      this.cancelReason = props.cancelReason;
    }
  }
}
