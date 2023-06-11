import { Property } from 'wemacu-nestjs';

export interface CategoryDTOProps {
  id: string;
  name: string;
  isHome: boolean;
}

export class CategoryDTO {
  @Property({ apiProperty: { type: 'string', description: '카테고리 ID' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '카테고리 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'boolean', description: '홈 카테고리 여부' } })
  isHome: boolean;

  constructor(props: CategoryDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.isHome = props.isHome;
  }
}
