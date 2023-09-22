import { Property } from 'cumuco-nestjs';

import { UpdateCategoryIconDTO, UpdateCategoryIconDTOProps } from './update-category-icon.dto';

export interface UpdateCategoryDTOProps {
  name?: string;
  icons: UpdateCategoryIconDTOProps[];
  isHome?: boolean;
  isRecommended?: boolean;
}
export class UpdateCategoryDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '카테고리 이름' } })
  name: string;

  @Property({
    apiProperty: {
      type: UpdateCategoryIconDTO,
      nullable: true,
      isArray: true,
      description: '아이콘,홈 카테고리라면 아이콘 필수',
    },
  })
  icons?: UpdateCategoryIconDTO[];

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '홈 카테고리 여부' } })
  isHome?: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '추천 여부' } })
  isRecommended?: boolean;

  constructor(props?: UpdateCategoryDTOProps) {
    if (props) {
      this.name = props.name;
      this.icons = props.icons.map((icon) => new UpdateCategoryIconDTO(icon));
      this.isHome = props.isHome;
      this.isRecommended = props.isRecommended;
    }
  }
}
