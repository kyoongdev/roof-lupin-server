import { Property } from 'wemacu-nestjs';

import { TimeValidation } from './validation';

export interface CreateReservationRentalTypeDTOProps {
  rentalTypeId: string;
  startAt: number;
  endAt: number;
}

export class CreateReservationRentalTypeDTO {
  @Property({ apiProperty: { type: 'string', description: '대여 id' } })
  rentalTypeId: string;

  @TimeValidation()
  @Property({ apiProperty: { type: 'number', description: '대여 시작 시간' } })
  startAt: number;

  @TimeValidation()
  @Property({ apiProperty: { type: 'number', description: '대여 종료 시간' } })
  endAt: number;

  constructor(props?: CreateReservationRentalTypeDTOProps) {
    if (props) {
      this.rentalTypeId = props.rentalTypeId;
      this.startAt = props.startAt;
      this.endAt = props.endAt;
    }
  }
}
