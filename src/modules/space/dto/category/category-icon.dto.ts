import { Property } from 'cumuco-nestjs';

import { IconDTO, IconDTOProps } from '@/modules/admin/dto/icon';

export interface CategoryIconDTOProps {
  categoryId: string;
  iconId: string;
  icon: IconDTOProps;
  isMapIcon: boolean;
}

export class CategoryIconDTO {
  @Property({ apiProperty: { type: 'string', description: '카테고리 아이콘 id' } })
  categoryId: string;

  @Property({ apiProperty: { type: 'string', description: '아이콘 id' } })
  iconId: string;

  @Property({ apiProperty: { type: 'boolean', description: '맵 아이콘 여부' } })
  isMapIcon: boolean;

  @Property({ apiProperty: { type: IconDTO, description: '아이콘 정보' } })
  icon: IconDTO;

  constructor(props: CategoryIconDTOProps) {
    this.categoryId = props.categoryId;
    this.iconId = props.iconId;
    this.icon = new IconDTO(props.icon);
    this.isMapIcon = props.isMapIcon;
  }
}
