import { Property } from 'cumuco-nestjs';

export interface CreateLocationFilterGroupDTOProps {
  name: string;
}

export class CreateLocationFilterGroupDTO {
  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  constructor(props?: CreateLocationFilterGroupDTOProps) {
    if (props) {
      this.name = props.name;
    }
  }
}
