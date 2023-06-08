import { CreateReservationDTO, CreateReservationDTOProps } from './create-reservation.dto';

export type UpdateReservationDTOProps = CreateReservationDTOProps;

export class UpdateReservationDTO extends CreateReservationDTO {
  constructor(props?: UpdateReservationDTOProps) {
    super(props);
  }
}
