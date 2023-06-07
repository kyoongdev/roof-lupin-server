import { type NaverAddressElement, Property } from 'wemacu-nestjs';

export class NaverAddressElementDTO {
  @Property({ apiProperty: { type: 'string', isArray: true } })
  types: string[];

  @Property({ apiProperty: { type: 'string' } })
  longName: string;

  @Property({ apiProperty: { type: 'string' } })
  shortName: string;

  @Property({ apiProperty: { type: 'string' } })
  code: string;

  constructor(props: NaverAddressElement) {
    this.types = props.types;
    this.longName = props.longName;
    this.shortName = props.shortName;
    this.code = props.code;
  }
}
