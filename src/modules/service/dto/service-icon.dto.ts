import { Property } from 'cumuco-nestjs';

import { IconDTO, IconDTOProps } from '@/modules/admin/dto/icon';

export interface ServiceIconDTOProps {
  serviceId: string;
  iconId: string;
  icon: IconDTOProps;
  isSelected: boolean;
}

export class ServiceIconDTO {
  @Property({ apiProperty: { type: 'string', description: '서비스 아이디' } })
  serviceId: string;

  @Property({ apiProperty: { type: 'string', description: '아이콘 아이디' } })
  iconId: string;

  @Property({ apiProperty: { type: 'string', description: '아이콘' } })
  iconPath: string;

  @Property({ apiProperty: { type: 'boolean', description: '선택용 여부' } })
  isSelected: boolean;

  constructor(props: ServiceIconDTOProps) {
    this.serviceId = props.serviceId;
    this.iconId = props.iconId;
    this.iconPath = props.icon.url;
    this.isSelected = props.isSelected;
  }
}
