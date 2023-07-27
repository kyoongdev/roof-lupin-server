import { Property } from 'cumuco-nestjs';
interface UpdateSloganDTOProps {
  isDefault: boolean;
}

export class UpdateSloganDTO {
  @Property({ apiProperty: { type: 'boolean' } })
  isDefault: boolean;

  constructor(props?: UpdateSloganDTOProps) {
    if (props) {
      this.isDefault = props.isDefault;
    }
  }
}
