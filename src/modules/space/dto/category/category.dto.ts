import { Property } from 'cumuco-nestjs';

import { CategoryIconDTO, CategoryIconDTOProps } from '@/modules/category/dto/category-icon.dto';

export interface SpaceCategoryDTOProps {
  id: string;
  name: string;
  icons: CategoryIconDTOProps[];
  orderNo?: number;
}

export class SpaceCategoryDTO {
  @Property({ apiProperty: { type: 'string', description: '카테고리 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '카테고리 이름' } })
  name: string;

  @Property({ apiProperty: { type: CategoryIconDTO, isArray: true, description: '카테고리 아이콘 경로' } })
  icons: CategoryIconDTO[];

  @Property({ apiProperty: { type: 'number', nullable: true, description: '순서' } })
  orderNo?: number;

  constructor(props: SpaceCategoryDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.icons = props.icons.map((icon) => new CategoryIconDTO(icon));
    this.orderNo = props.orderNo ?? null;
  }
}
