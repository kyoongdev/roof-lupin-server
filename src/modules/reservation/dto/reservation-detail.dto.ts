import { Property } from 'wemacu-nestjs';

import { RentalTypeDTO, RentalTypeDTOProps } from '@/modules/space/dto/rentalType';
import { CommonUserDTO, type CommonUserProps } from '@/modules/user/dto';

import { ReservationDTO, type ReservationDTOProps } from './reservation.dto';

export interface ReservationDetailDTOProps extends ReservationDTOProps {
  user: CommonUserProps;
  rentalType: RentalTypeDTOProps;
}

export class ReservationDetailDTO extends ReservationDTO {
  @Property({ apiProperty: { type: CommonUserDTO, description: '유저 정보' } })
  user: CommonUserDTO;

  @Property({ apiProperty: { type: RentalTypeDTO, description: '대여 정보' } })
  rentalType: RentalTypeDTO;

  constructor(props: ReservationDetailDTOProps) {
    super(props);
    this.user = new CommonUserDTO(props.user);
    this.rentalType = new RentalTypeDTO(props.rentalType);
  }
}
