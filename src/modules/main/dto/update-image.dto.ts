import { Property } from 'cumuco-nestjs';
interface UpdateHomeImageDTOProps {
  isDefault: boolean;
}

export class UpdateMainImageDTO {
  @Property({ apiProperty: { type: 'boolean' } })
  isDefault: boolean;

  constructor(props?: UpdateHomeImageDTOProps) {
    if (props) {
      this.isDefault = props.isDefault;
    }
  }
}
