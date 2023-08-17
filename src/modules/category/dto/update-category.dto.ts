import { Property } from 'cumuco-nestjs';

export interface UpdateCategoryDTOProps {
  name?: string;
  iconId?: string;
  isHome?: boolean;
  isRecommended?: boolean;
}
export class UpdateCategoryDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '카테고리 이름' } })
  name: string;

  @Property({
    apiProperty: { type: 'string', nullable: true, description: '아이콘 경로, 홈 카테고리라면 아이콘 필수' },
  })
  iconId?: string;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '홈 카테고리 여부' } })
  isHome?: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '추천 여부' } })
  isRecommended?: boolean;

  constructor(props?: UpdateCategoryDTOProps) {
    if (props) {
      this.name = props.name;
      this.iconId = props.iconId;
      this.isHome = props.isHome;
      this.isRecommended = props.isRecommended;
    }
  }
}
