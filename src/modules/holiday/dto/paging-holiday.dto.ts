import { Property } from 'cumuco-nestjs';

import { HolidayDTO, HolidayDTOProps } from './holiday.dto';

export interface PagingHolidayDTOProps {
  year: number;
  month: number;
  holidays: HolidayDTOProps[];
}
export class PagingHolidayDTO {
  @Property({ apiProperty: { type: 'number', description: '연도' } })
  year: number;

  @Property({ apiProperty: { type: 'number', description: '월' } })
  month: number;

  @Property({ apiProperty: { type: HolidayDTO, isArray: true, description: '휴일' } })
  holidays: HolidayDTO[];

  constructor(props: PagingHolidayDTOProps) {
    this.year = props.year;
    this.month = props.month;
    this.holidays = props.holidays.map((item) => new HolidayDTO(item));
  }
}
