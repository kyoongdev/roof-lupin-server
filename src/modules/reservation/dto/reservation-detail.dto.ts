import { Property } from 'wemacu-nestjs';

import { ReservationDTO, type ReservationDTOProps } from './reservation.dto';

export interface ReservationDetailDTOProps extends ReservationDTOProps {
  orderId?: string;
  orderResultId?: string;
  payMethod?: number;
  payedAt?: Date;
  refundCost?: number;
}

export class ReservationDetailDTO extends ReservationDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '주문번호' } })
  orderId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '주문결과번호' } })
  orderResultId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '결제방식' } })
  payMethod?: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '결제일' } })
  payedAt?: Date;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '환불 금액' } })
  refundCost?: number;

  constructor(props: ReservationDetailDTOProps) {
    super(props);
    this.orderId = props.orderId;
    this.orderResultId = props.orderResultId;
    this.payMethod = props.payMethod;
    this.payedAt = props.payedAt;
    this.refundCost = props.refundCost;
  }
}
