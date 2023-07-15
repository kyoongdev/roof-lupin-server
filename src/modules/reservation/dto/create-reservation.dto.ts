import { Property } from 'wemacu-nestjs';

import { CreatePaymentDTO, CreatePaymentDTOProps } from './create-payment';
import {
  CreateReservationRentalTypeDTO,
  CreateReservationRentalTypeDTOProps,
} from './create-reservation-rental-type.dto';

export interface CreateReservationDTOProps {
  year: string;
  month: string;
  day: string;
  totalCost: number;
  userCount: number;
  originalCost: number;
  rentalTypes: CreateReservationRentalTypeDTOProps[];
  spaceId: string;
}

export class CreateReservationDTO {
  @Property({ apiProperty: { type: 'string', description: '예약 연도' } })
  year: string;

  @Property({ apiProperty: { type: 'string', description: '예약 월' } })
  month: string;

  @Property({ apiProperty: { type: 'string', description: '예약 일' } })
  day: string;

  @Property({ apiProperty: { type: 'number', description: '이용 인원' } })
  userCount: number;

  @Property({ apiProperty: { type: 'number', description: '예약 비용' } })
  totalCost: number;

  @Property({ apiProperty: { type: 'number', description: '할인제외 예약 비용' } })
  originalCost: number;

  @Property({ apiProperty: { type: CreateReservationRentalTypeDTO, isArray: true, description: '대여 타입들' } })
  rentalTypes: CreateReservationRentalTypeDTO[];

  @Property({ apiProperty: { type: 'string', description: '공간 아이디' } })
  spaceId: string;

  constructor(props?: CreateReservationDTOProps) {
    if (props) {
      this.year = props.year;
      this.month = props.month;
      this.day = props.day;
      this.totalCost = props.totalCost;
      this.originalCost = props.originalCost;
      this.rentalTypes = props.rentalTypes;
      this.spaceId = props.spaceId;
    }
  }
}
