import { Property } from 'cumuco-nestjs';

import { CreateServiceDTO, CreateServiceDTOProps } from './create-service.dto';

export interface UpdateServiceTitleDTOProps {
  name?: string;
  services?: CreateServiceDTOProps[];
}

export class UpdateServiceTitleDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '이름' } })
  name?: string;

  @Property({ apiProperty: { type: CreateServiceDTO, isArray: true, nullable: true, description: '서비스 리스트' } })
  services?: CreateServiceDTO[];

  constructor(props?: UpdateServiceTitleDTOProps) {
    if (props) {
      this.name = props.name;
      this.services = props.services?.map((service) => new CreateServiceDTO(service));
    }
  }
}
