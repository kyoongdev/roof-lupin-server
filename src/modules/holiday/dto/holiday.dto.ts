import { Property } from 'wemacu-nestjs';

export interface HolidayDTOProps {
  id: string;
  name: string;
  year: string;
  month: string;
  day: string;
}

export class HolidayDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  name: string;

  @Property({ apiProperty: { type: 'string' } })
  year: string;

  @Property({ apiProperty: { type: 'string' } })
  month: string;

  @Property({ apiProperty: { type: 'string' } })
  day: string;

  constructor(props: HolidayDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.year = props.year;
    this.month = props.month;
    this.day = props.day;
  }
}
