import { Property } from 'cumuco-nestjs';

import { HostDTO, HostDTOProps } from '@/modules/host/dto';
import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';

export interface ReservationCancelDTOProps {
  id: string;
  reason: string;
  user?: CommonUserProps;
  host?: HostDTOProps;
}

export class ReservationCancelDTO {
  @Property({ apiProperty: { type: 'string', description: '예약 취소 아이디' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '취소 사유' } })
  reason: string;

  @Property({ apiProperty: { type: CommonUserDTO, description: '유저' } })
  user?: CommonUserDTO;

  @Property({ apiProperty: { type: HostDTO, description: '호스트' } })
  host?: HostDTO;

  constructor(props: ReservationCancelDTOProps) {
    this.id = props.id;
    this.reason = props.reason;
    this.user = props.user ? new CommonUserDTO(props.user) : null;
    this.host = props.host ? new HostDTO(props.host) : null;
  }
}
