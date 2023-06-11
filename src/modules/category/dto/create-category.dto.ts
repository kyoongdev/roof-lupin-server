import { Property } from 'wemacu-nestjs';

export interface CreateCategoryDTOProps {
  name: string;
  isHome?: boolean;
}
export class CreateCategoryDTO {
  @Property({ apiProperty: { type: 'string', description: '카테고리 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '홈 카테고리 여부' } })
  isHome?: boolean;

  constructor(props?: CreateCategoryDTOProps) {
    if (props) {
      this.name = props.name;
      this.isHome = props.isHome;
    }
  }
}
