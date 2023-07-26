import { Property } from 'cumuco-nestjs';

export interface CreateServiceDTOProps {
  iconPath: string;
  name: string;
}

export class CreateServiceDTO {
  @Property({ apiProperty: { type: 'string', description: '시설 아이콘 경로' } })
  iconPath: string;

  @Property({ apiProperty: { type: 'string', description: '시설 이름' } })
  name: string;

  constructor(props?: CreateServiceDTOProps) {
    if (props) {
      this.iconPath = props.iconPath;
      this.name = props.name;
    }
  }
}
