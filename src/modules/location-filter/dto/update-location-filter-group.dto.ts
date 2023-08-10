import { Property } from 'cumuco-nestjs';

export interface UpdateLocationFilterGroupDTOProps {
  name: string;
}

export class UpdateLocationFilterGroupDTO {
  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  constructor(props?: UpdateLocationFilterGroupDTOProps) {
    if (props) {
      this.name = props.name;
    }
  }
}
