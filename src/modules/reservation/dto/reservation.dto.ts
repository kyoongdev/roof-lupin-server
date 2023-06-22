import { Property } from 'wemacu-nestjs';

import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';
import { RentalTypeDTO, RentalTypeDTOProps } from '@/modules/space/dto/rentalType';
import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';

import { BaseReservationDTO, BaseReservationDTOProps } from './base-reservation.dto';

export interface ReservationDTOProps extends BaseReservationDTOProps {
  user: CommonUserProps;
  rentalType: RentalTypeDTOProps;
  space: SpaceDTOProps;
  isReviewed: boolean;
}

export class ReservationDTO extends BaseReservationDTO {
  @Property({ apiProperty: { type: CommonUserDTO, description: '유저 정보' } })
  user: CommonUserDTO;

  @Property({ apiProperty: { type: RentalTypeDTO, description: '대여 정보' } })
  rentalType: RentalTypeDTO;

  @Property({ apiProperty: { type: SpaceDTO, description: '공간 정보' } })
  space: SpaceDTO;

  @Property({ apiProperty: { type: 'boolean', description: '리뷰 작성 여부' } })
  isReviewed: boolean;

  constructor(props: ReservationDTOProps) {
    super(props);
    this.isReviewed = props.isReviewed;
    this.user = new CommonUserDTO(props.user);
    this.rentalType = new RentalTypeDTO(props.rentalType);
    this.space = new SpaceDTO(props.space);
  }
}
