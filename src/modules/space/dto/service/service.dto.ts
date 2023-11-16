import { Property } from 'cumuco-nestjs';

import { IconDTOProps } from '@/modules/admin/dto/icon';
import { ServiceIconDTO, ServiceIconDTOProps } from '@/modules/service/dto/service-icon.dto';

export interface ServiceDTOProps {
  id: string;
  icons: ServiceIconDTOProps[];
  name: string;
  serviceTitleId: string;
}

export class ServiceDTO {
  @Property({ apiProperty: { type: 'string', description: '시설 id' } })
  id: string;

  @Property({ apiProperty: { type: ServiceIconDTO, isArray: true, description: '아이콘' } })
  icons: ServiceIconDTO[];

  @Property({ apiProperty: { type: 'string', description: '시설 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', description: '제목 id' } })
  titleId: string;

  constructor(props: ServiceDTOProps) {
    this.id = props.id;
    this.icons = props.icons.map((icon) => new ServiceIconDTO(icon));
    this.name = props.name;
    this.titleId = props.serviceTitleId;
  }
}
