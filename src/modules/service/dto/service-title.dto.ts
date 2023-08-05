import { Property } from 'cumuco-nestjs';

import { ServiceDTO, ServiceDTOProps } from './service.dto';

export interface ServiceTitleDTOProps {
  name: string;
  services: ServiceDTOProps[];
}

export class ServiceTitleDTO {
  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  @Property({ apiProperty: { type: ServiceDTO, isArray: true, description: '서비스 리스트' } })
  services: ServiceDTO[];

  constructor(props: ServiceTitleDTOProps) {
    this.name = props.name;
    this.services = props.services.map((service) => new ServiceDTO(service));
  }
}
