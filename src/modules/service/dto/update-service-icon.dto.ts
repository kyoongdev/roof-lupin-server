import { Property } from 'cumuco-nestjs';

import { IconDTO, IconDTOProps } from '@/modules/admin/dto/icon';

export interface UpdateServiceIconDTOProps {
  iconId: string;
  isSelected: boolean;
}

export class UpdateServiceIconDTO {
  @Property({ apiProperty: { type: 'string', description: '아이콘 아이디' } })
  iconId: string;

  @Property({ apiProperty: { type: 'boolean', description: '선택용 여부' } })
  isSelected: boolean;

  constructor(props: UpdateServiceIconDTOProps) {
    this.iconId = props.iconId;
    this.isSelected = props.isSelected;
  }
}
