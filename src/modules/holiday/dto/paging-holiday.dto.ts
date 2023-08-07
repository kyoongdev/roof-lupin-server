import { Property } from 'cumuco-nestjs';

import { HolidayDTO, HolidayDTOProps } from './holiday.dto';

export interface PagingHolidayDTOProps {
  year: string;
  month: string;
  holidays: HolidayDTOProps[];
}
export class PagingHolidayDTO {
  @Property({ apiProperty: { type: 'string', description: '연도' } })
  year: string;

  @Property({ apiProperty: { type: 'string', description: '월' } })
  month: string;

  @Property({ apiProperty: { type: HolidayDTO, isArray: true, description: '휴일' } })
  holidays: HolidayDTO[];

  constructor(props: PagingHolidayDTOProps) {
    this.year = props.year;
    this.month = props.month;
    this.holidays = props.holidays.map((item) => new HolidayDTO(item));
  }
}
