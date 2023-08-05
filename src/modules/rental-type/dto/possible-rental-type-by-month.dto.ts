import { Property } from 'cumuco-nestjs';

import { PossibleRentalTypesDTO, PossibleRentalTypesDTOProps } from './possible-rental-types.dto';

export interface PossibleRentalTypeByMonthDTOProps {
  day: string;
  isPossible: boolean;
  isHoliday: boolean;
  rentalType: PossibleRentalTypesDTOProps;
}

export class PossibleRentalTypeByMonthDTO {
  @Property({ apiProperty: { type: 'string', description: '요일' } })
  day: string;

  @Property({ apiProperty: { type: 'boolean', description: '가능 여부' } })
  isPossible: boolean;

  @Property({ apiProperty: { type: 'boolean', description: '공휴일 여부' } })
  isHoliday: boolean;

  @Property({ apiProperty: { type: PossibleRentalTypesDTO, description: '대여 정보' } })
  rentalType: PossibleRentalTypesDTO;

  constructor(props: PossibleRentalTypeByMonthDTOProps) {
    this.day = props.day;
    this.isPossible = props.isPossible;
    this.isHoliday = props.isHoliday;
    this.rentalType = new PossibleRentalTypesDTO(props.rentalType);
  }
}
