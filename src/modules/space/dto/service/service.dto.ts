import { Property } from 'cumuco-nestjs';

export interface ServiceDTOProps {
  id: string;
  iconPath: string;
  name: string;
}

export class ServiceDTO {
  @Property({ apiProperty: { type: 'string', description: '시설 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '시설 아이콘 경로' } })
  iconPath: string;

  @Property({ apiProperty: { type: 'string', description: '시설 이름' } })
  name: string;

  constructor(props: ServiceDTOProps) {
    this.id = props.id;
    this.iconPath = props.iconPath;
    this.name = props.name;
  }
}
