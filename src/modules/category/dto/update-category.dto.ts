import { Property } from 'wemacu-nestjs';

export interface UpdateCategoryDTOProps {
  name?: string;
  isHome?: boolean;
}
export class UpdateCategoryDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '카테고리 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '홈 카테고리 여부' } })
  isHome?: boolean;

  constructor(props?: UpdateCategoryDTOProps) {
    if (props) {
      this.name = props.name;
      this.isHome = props.isHome;
    }
  }
}
