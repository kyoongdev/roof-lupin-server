import { Property } from 'cumuco-nestjs';

export interface UpdateSpaceCategoryDTOProps {
  name: string;
}

export class UpdateSpaceCategoryDTO {
  @Property({ apiProperty: { type: 'string', description: '카테고리 이름' } })
  name: string;

  constructor(props?: UpdateSpaceCategoryDTOProps) {
    if (props) {
      this.name = props.name;
    }
  }
}
