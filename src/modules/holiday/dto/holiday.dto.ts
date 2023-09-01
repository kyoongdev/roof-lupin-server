import { Property } from 'cumuco-nestjs';

export interface HolidayDTOProps {
  id: string;
  name: string;
  year: number;
  month: number;
  day: number;
}

export class HolidayDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  name: string;

  @Property({ apiProperty: { type: 'string' } })
  year: number;

  @Property({ apiProperty: { type: 'number' } })
  month: number;

  @Property({ apiProperty: { type: 'number' } })
  day: number;

  constructor(props: HolidayDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.year = props.year;
    this.month = props.month;
    this.day = props.day;
  }
}
