import { Property } from 'cumuco-nestjs';

export interface HostCancelReservationDTOProps {
  cancelReason: string;
}

export class HostCancelReservationDTO {
  @Property({ apiProperty: { type: 'string ', description: '취소 사유' } })
  cancelReason: string;

  constructor(props?: HostCancelReservationDTOProps) {
    if (props) {
      this.cancelReason = props.cancelReason;
    }
  }
}
