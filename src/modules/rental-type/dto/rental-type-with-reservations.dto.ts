import { Property } from 'cumuco-nestjs';

import { GetCurrentDayRenalType } from '@/interface/rental-type.interface';
import {
  BaseReservationDTO,
  BaseReservationDTOProps,
  ReservationDTO,
  ReservationDTOProps,
} from '@/modules/reservation/dto';
import { PossibleRentalTypeByMonthQuery } from '@/modules/space/dto/query';
import { DAY_ENUM, getDay } from '@/utils';

import { RentalTypeDTO, RentalTypeDTOProps } from './rental-type.dto';

export interface RentalTypeWithReservationsDTOProps extends RentalTypeDTOProps {
  reservations: ReservationDTOProps[];
  spaceId: string;
}

export class RentalTypeWithReservationDTO extends RentalTypeDTO {
  @Property({ apiProperty: { type: ReservationDTO, isArray: true, description: '예약 정보' } })
  reservations: ReservationDTO[];

  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  spaceId: string;

  constructor(props: RentalTypeWithReservationsDTOProps) {
    super(props);
    this.reservations = props.reservations.map((reservation) => new ReservationDTO(reservation));
    this.spaceId = props.spaceId;
  }

  getCurrentDayRentalType(isHoliday: boolean, data: GetCurrentDayRenalType) {
    if (this.day === DAY_ENUM.HOLIDAY && isHoliday) {
      return this;
    }
    if (this.day !== DAY_ENUM.HOLIDAY && !isHoliday) {
      const currentDay = getDay(Number(data.year), Number(data.month), Number(data.day));

      if (this.day === currentDay) {
        return this;
      } else {
        return null;
      }
    }

    return null;
  }
}
