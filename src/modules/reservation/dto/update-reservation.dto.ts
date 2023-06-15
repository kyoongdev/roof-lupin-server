import { CreatePaymentDTO, CreatePaymentDTOProps } from './create-payment';

export type UpdateReservationDTOProps = CreatePaymentDTOProps;

export class UpdateReservationDTO extends CreatePaymentDTO {
  constructor(props?: UpdateReservationDTOProps) {
    super(props);
  }
}
