import { Property } from 'cumuco-nestjs';

import { UpdateServiceIconDTO, UpdateServiceIconDTOProps } from './update-service-icon.dto';

export interface UpdateServiceDTOProps {
  selectedIcon: UpdateServiceIconDTOProps;
  notSelectedIcon: UpdateServiceIconDTOProps;
  name?: string;
}

export class UpdateServiceDTO {
  @Property({ apiProperty: { type: UpdateServiceIconDTO, nullable: true, description: '선택 아이콘' } })
  selectedIcon?: UpdateServiceIconDTO;

  @Property({ apiProperty: { type: UpdateServiceIconDTO, nullable: true, description: '미선택 아이콘' } })
  notSelectedIcon?: UpdateServiceIconDTO;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '이름' } })
  name?: string;

  constructor(props?: UpdateServiceDTOProps) {
    if (props) {
      this.selectedIcon = new UpdateServiceIconDTO(props.selectedIcon);
      this.notSelectedIcon = new UpdateServiceIconDTO(props.notSelectedIcon);
      this.name = props.name;
    }
  }
}
