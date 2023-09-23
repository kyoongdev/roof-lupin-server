import { Property } from 'cumuco-nestjs';

import { CreateServiceIconDTO, CreateServiceIconDTOProps } from './create-service-icon.dto';

export interface CreateServiceDTOProps {
  icons: CreateServiceIconDTOProps[];
  name: string;
}

export class CreateServiceDTO {
  @Property({ apiProperty: { type: CreateServiceIconDTO, isArray: true, description: '아이콘 id' } })
  icons: CreateServiceIconDTO[];

  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  constructor(props?: CreateServiceDTOProps) {
    if (props) {
      this.icons = props.icons.map((icon) => new CreateServiceIconDTO(icon));
      this.name = props.name;
    }
  }
}
