import { Property } from 'cumuco-nestjs';

import { CreateCategoryIconDTO, CreateCategoryIconDTOProps } from './create-category-icon.dto';

export interface CreateCategoryDTOProps {
  name: string;
  icons: CreateCategoryIconDTOProps[];
  isHome?: boolean;
  isRecommended?: boolean;
}
export class CreateCategoryDTO {
  @Property({ apiProperty: { type: 'string', description: '카테고리 이름' } })
  name: string;

  @Property({
    apiProperty: { type: CreateCategoryIconDTO, isArray: true, description: '아이콘,홈 카테고리라면 아이콘 필수' },
  })
  icons: CreateCategoryIconDTO[];

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '홈 카테고리 여부' } })
  isHome?: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '추천 여부' } })
  isRecommended?: boolean;

  constructor(props?: CreateCategoryDTOProps) {
    if (props) {
      this.name = props.name;
      this.icons = props.icons.map((icon) => new CreateCategoryIconDTO(icon));
      this.isHome = props.isHome;
      this.isRecommended = props.isRecommended;
    }
  }
}
