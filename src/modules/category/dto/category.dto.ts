import { Property } from 'cumuco-nestjs';

export interface CategoryDTOProps {
  id: string;
  name: string;
  isHome: boolean;
  iconPath?: string;
  isRecommended: boolean;
}

export class CategoryDTO {
  @Property({ apiProperty: { type: 'string', description: '카테고리 ID' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '카테고리 이름' } })
  name: string;

  @Property({
    apiProperty: { type: 'string', nullable: true, description: '아이콘 경로' },
  })
  iconPath?: string;

  @Property({ apiProperty: { type: 'boolean', description: '홈 카테고리 여부' } })
  isHome: boolean;

  @Property({ apiProperty: { type: 'boolean', description: '추천 여부' } })
  isRecommended: boolean;

  constructor(props: CategoryDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.iconPath = props.iconPath;
    this.isHome = props.isHome;
    this.isRecommended = props.isRecommended;
  }
}
