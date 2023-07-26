import { Property } from 'cumuco-nestjs';

export interface CreateCategoryDTOProps {
  name: string;
  iconPath?: string;
  isHome?: boolean;
  isRecommended?: boolean;
}
export class CreateCategoryDTO {
  @Property({ apiProperty: { type: 'string', description: '카테고리 이름' } })
  name: string;

  @Property({
    apiProperty: { type: 'string', nullable: true, description: '아이콘 경로, 홈 카테고리라면 아이콘 필수' },
  })
  iconPath?: string;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '홈 카테고리 여부' } })
  isHome?: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '추천 여부' } })
  isRecommended?: boolean;

  constructor(props?: CreateCategoryDTOProps) {
    if (props) {
      this.name = props.name;
      this.iconPath = props.iconPath;
      this.isHome = props.isHome;
      this.isRecommended = props.isRecommended;
    }
  }
}
