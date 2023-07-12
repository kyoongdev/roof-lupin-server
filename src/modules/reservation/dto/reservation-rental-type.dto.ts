import { Property } from 'wemacu-nestjs';

export interface ReservationRentalTypeDTOProps {
  rentalTypeId: string;
  startAt: number;
  endAt: number;
}

export class ReservationRentalTypeDTO {
  @Property({ apiProperty: { type: 'string', description: '대여 id' } })
  rentalTypeId: string;

  @Property({ apiProperty: { type: 'number', description: '대여 시작 시간' } })
  startAt: number;

  @Property({ apiProperty: { type: 'number', description: '대여 종료 시간' } })
  endAt: number;

  constructor(props?: ReservationRentalTypeDTOProps) {
    if (props) {
      this.rentalTypeId = props.rentalTypeId;
      this.startAt = props.startAt;
      this.endAt = props.endAt;
    }
  }
}
