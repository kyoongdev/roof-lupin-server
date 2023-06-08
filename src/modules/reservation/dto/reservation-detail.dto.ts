import { ReservationDTO, type ReservationDTOProps } from './reservation.dto';

export type ReservationDetailDTOProps = ReservationDTOProps;

export class ReservationDetailDTO extends ReservationDTO {
  constructor(props: ReservationDetailDTOProps) {
    super(props);
  }
}
