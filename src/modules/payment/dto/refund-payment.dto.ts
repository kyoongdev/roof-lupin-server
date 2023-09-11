import { Property } from 'cumuco-nestjs';

export interface RefundPaymentDTOProps {
  reservationId: string;
  cancelReason: string;
}

export class RefundPaymentDTO {
  @Property({ apiProperty: { type: 'string', description: '예약 id' } })
  reservationId: string;

  @Property({ apiProperty: { type: 'string', description: '취소 사유' } })
  cancelReason: string;

  constructor(props?: RefundPaymentDTOProps) {
    if (props) {
      this.reservationId = props.reservationId;
      this.cancelReason = props.cancelReason;
    }
  }
}
