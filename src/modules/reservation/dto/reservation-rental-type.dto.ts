import { Property } from 'cumuco-nestjs';

import { RentalTypeDTO, RentalTypeDTOProps } from '@/modules/rental-type/dto';

import { TimeValidation } from './validation';

export interface ReservationRentalTypeDTOProps {
  rentalTypeId: string;
  startAt: number;
  endAt: number;
  rentalType: RentalTypeDTOProps;
}

export class ReservationRentalTypeDTO {
  @Property({ apiProperty: { type: 'string', description: '대여 id' } })
  rentalTypeId: string;

  @TimeValidation()
  @Property({ apiProperty: { type: 'number', description: '대여 시작 시간' } })
  startAt: number;

  @TimeValidation()
  @Property({ apiProperty: { type: 'number', description: '대여 종료 시간' } })
  endAt: number;

  @Property({ apiProperty: { type: RentalTypeDTO, description: '대여 타입' } })
  rentalType: RentalTypeDTO;

  constructor(props: ReservationRentalTypeDTOProps) {
    this.rentalTypeId = props.rentalTypeId;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.rentalType = new RentalTypeDTO(props.rentalType);
  }
}
