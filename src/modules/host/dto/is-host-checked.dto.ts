import { Property } from 'wemacu-nestjs';

export interface IsHostCheckedDTOProps {
  isChecked: boolean;
}

export class IsHostCheckedDTO {
  @Property({ apiProperty: { type: 'boolean' } })
  isChecked: boolean;
  constructor(props: IsHostCheckedDTOProps) {
    this.isChecked = props.isChecked;
  }
}
