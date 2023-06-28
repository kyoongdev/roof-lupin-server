import { Property } from 'wemacu-nestjs';

export interface HolidayDTOProps {
  id: string;
  name: string;
  year: string;
  month: string;
  day: string;
}

export class HolidayDTO {
  @Property({ apiProperty: { type: 'string', description: '아이디' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', description: '연도' } })
  year: string;

  @Property({ apiProperty: { type: 'string', description: '월' } })
  month: string;

  @Property({ apiProperty: { type: 'string', description: '일' } })
  day: string;

  constructor(props: HolidayDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.year = props.year;
    this.month = props.month;
    this.day = props.day;
  }
}
