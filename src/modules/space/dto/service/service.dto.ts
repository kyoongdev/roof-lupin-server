import { Property } from 'cumuco-nestjs';

import { IconDTOProps } from '@/modules/admin/dto/icon';

export interface ServiceDTOProps {
  id: string;
  icon: IconDTOProps;
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
    this.iconPath = props.icon.url;
    this.name = props.name;
  }
}
