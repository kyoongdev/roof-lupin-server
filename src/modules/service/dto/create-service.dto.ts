import { Property } from 'cumuco-nestjs';

export interface CreateServiceDTOProps {
  iconId: string;
  name: string;
}

export class CreateServiceDTO {
  @Property({ apiProperty: { type: 'string', description: '아이콘 id' } })
  iconId: string;

  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  constructor(props?: CreateServiceDTOProps) {
    if (props) {
      this.iconId = props.iconId;
      this.name = props.name;
    }
  }
}
