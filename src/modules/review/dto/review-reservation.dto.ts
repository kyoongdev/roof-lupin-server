import { Property } from 'cumuco-nestjs';

import {
  ReservationRentalTypeDTO,
  ReservationRentalTypeDTOProps,
} from '@/modules/reservation/dto/reservation-rental-type.dto';

export interface ReviewReservationDTOProps {
  id: string;
  year: number;
  month: number;
  day: number;
  rentalTypes: ReservationRentalTypeDTOProps[];
}

export class ReviewReservationDTO {
  @Property({ apiProperty: { type: 'string', description: '예약 아이디' } })
  id: string;

  @Property({ apiProperty: { type: 'number', description: '예약 년도' } })
  year: number;

  @Property({ apiProperty: { type: 'number', description: '예약 월' } })
  month: number;

  @Property({ apiProperty: { type: 'number', description: '예약 일' } })
  day: number;

  @Property({ apiProperty: { type: ReservationRentalTypeDTO, isArray: true, description: '예약 타입 정보' } })
  rentalTypes: ReservationRentalTypeDTO[];

  constructor(props: ReviewReservationDTOProps) {
    this.id = props.id;
    this.year = props.year;
    this.month = props.month;
    this.day = props.day;
    this.rentalTypes = props.rentalTypes.map((rentalType) => new ReservationRentalTypeDTO(rentalType));
  }
}
