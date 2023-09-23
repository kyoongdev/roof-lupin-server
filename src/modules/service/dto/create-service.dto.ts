import { Property } from 'cumuco-nestjs';

import { CreateServiceIconDTO, CreateServiceIconDTOProps } from './create-service-icon.dto';

export interface CreateServiceDTOProps {
  selectedIcon: CreateServiceIconDTOProps;
  notSelectedIcon: CreateServiceIconDTOProps;
  name: string;
}

export class CreateServiceDTO {
  @Property({ apiProperty: { type: CreateServiceIconDTO, description: '선택 아이콘' } })
  selectedIcon: CreateServiceIconDTO;

  @Property({ apiProperty: { type: CreateServiceIconDTO, description: '미선택 아이콘' } })
  notSelectedIcon: CreateServiceIconDTO;

  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  constructor(props?: CreateServiceDTOProps) {
    if (props) {
      this.selectedIcon = new CreateServiceIconDTO(props.selectedIcon);
      this.notSelectedIcon = new CreateServiceIconDTO(props.notSelectedIcon);
      this.name = props.name;
    }
  }
}
