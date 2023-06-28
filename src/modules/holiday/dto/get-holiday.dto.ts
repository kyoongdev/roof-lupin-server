import { Property } from 'wemacu-nestjs';

export interface GetHolidayDTOProps {
  year: string;
  month: string;
}

export class GetHolidayDTO {
  @Property({ apiProperty: { type: 'string', description: '연도' } })
  year: string;

  @Property({ apiProperty: { type: 'string', description: '월' } })
  month: string;

  constructor(props: GetHolidayDTOProps) {
    this.year = props.year;
    this.month = props.month;
  }
}
