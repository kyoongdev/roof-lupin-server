import { Property } from 'wemacu-nestjs';

export interface IsAdminCheckedDTOProps {
  isChecked: boolean;
}

export class IsAdminCheckedDTO {
  @Property({ apiProperty: { type: 'boolean' } })
  isChecked: boolean;

  constructor(props: IsAdminCheckedDTOProps) {
    this.isChecked = props.isChecked;
  }
}
