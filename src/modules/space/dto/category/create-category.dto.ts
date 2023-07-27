import { Property } from 'cumuco-nestjs';

export interface CreateSpaceCategoryDTOProps {
  name: string;
}

export class CreateSpaceCategoryDTO {
  @Property({ apiProperty: { type: 'string', description: '카테고리 이름' } })
  name: string;

  constructor(props?: CreateSpaceCategoryDTOProps) {
    if (props) {
      this.name = props.name;
    }
  }
}
