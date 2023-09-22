import { Property } from 'cumuco-nestjs';

import { CategoryIconDTO, CategoryIconDTOProps } from './category-icon.dto';
import { CreateCategoryIconDTO, CreateCategoryIconDTOProps } from './create-category-icon.dto';

export interface CategoryDTOProps {
  id: string;
  name: string;
  isHome: boolean;
  icons: CategoryIconDTOProps[];
  isRecommended: boolean;
}

export class CategoryDTO {
  @Property({ apiProperty: { type: 'string', description: '카테고리 ID' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '카테고리 이름' } })
  name: string;

  @Property({ apiProperty: { type: CategoryIconDTO, isArray: true, description: '아이콘' } })
  icons: CategoryIconDTO[];

  @Property({ apiProperty: { type: 'boolean', description: '홈 카테고리 여부' } })
  isHome: boolean;

  @Property({ apiProperty: { type: 'boolean', description: '추천 여부' } })
  isRecommended: boolean;

  constructor(props: CategoryDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.icons = props.icons.map((icon) => new CategoryIconDTO(icon));
    this.isHome = props.isHome;
    this.isRecommended = props.isRecommended;
  }
}
