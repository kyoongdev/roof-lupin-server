import { Property } from 'cumuco-nestjs';

export interface CreateReservationCancelDTOProps {
  reason: string;
  userId?: string;
  hostId?: string;
}

export class CreateReservationCancelDTO {
  @Property({ apiProperty: { type: 'string', description: '취소 사유' } })
  reason: string;

  @Property({ apiProperty: { type: 'string', description: '유저 아이디' } })
  userId?: string;

  @Property({ apiProperty: { type: 'string', description: '호스트 아이디' } })
  hostId?: string;

  constructor(props: CreateReservationCancelDTOProps) {
    this.reason = props.reason;
    this.userId = props.userId;
    this.hostId = props.hostId;
  }
}
