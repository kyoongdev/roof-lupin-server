import { Property } from 'cumuco-nestjs';

export interface RefundDTOProps {
  refundCost: number;
  reason: string;
  userId?: string;
  hostId?: string;
}

export class RefundDTO {
  @Property({ apiProperty: { type: 'number', description: '환불 금액' } })
  refundCost: number;

  @Property({ apiProperty: { type: 'string', description: '환불 사유' } })
  reason: string;

  @Property({ apiProperty: { type: 'string', description: '유저 아이디' } })
  userId?: string;

  @Property({ apiProperty: { type: 'string', description: '호스트 아이디' } })
  hostId?: string;

  constructor(props: RefundDTOProps) {
    this.refundCost = props.refundCost;
    this.reason = props.reason;
    this.userId = props.userId;
    this.hostId = props.hostId;
  }
}
