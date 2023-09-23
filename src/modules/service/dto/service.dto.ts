import { Property } from 'cumuco-nestjs';

import { ServiceIconDTO, ServiceIconDTOProps } from './service-icon.dto';

export interface ServiceDTOProps {
  id: string;
  icons: ServiceIconDTOProps[];
  name: string;
}

export class ServiceDTO {
  @Property({ apiProperty: { type: 'string', description: '서비스 id' } })
  id: string;

  @Property({ apiProperty: { type: ServiceIconDTO, isArray: true, description: '아이콘' } })
  icons: ServiceIconDTO[];

  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  constructor(props: ServiceDTOProps) {
    this.id = props.id;
    this.icons = props.icons.map((icon) => new ServiceIconDTO(icon));
    this.name = props.name;
  }
}
