import { Property } from 'cumuco-nestjs';

import { CreateServiceDTO, CreateServiceDTOProps } from './create-service.dto';

export interface CreateServiceTitleDTOProps {
  name: string;
  services: CreateServiceDTOProps[];
}

export class CreateServiceTitleDTO {
  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  @Property({ apiProperty: { type: CreateServiceDTO, isArray: true, description: '서비스 리스트' } })
  services: CreateServiceDTO[];

  constructor(props?: CreateServiceTitleDTOProps) {
    if (props) {
      this.name = props.name;
      this.services = props.services.map((service) => new CreateServiceDTO(service));
    }
  }
}
