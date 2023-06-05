import { Property } from 'wemacu-nestjs';

export interface SpaceCategoryDTOProps {
  id: string;
  name: string;
}

export class SpaceCategoryDTO {
  @Property({ apiProperty: { type: 'string', description: '카테고리 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '카테고리 이름' } })
  name: string;

  constructor(props: SpaceCategoryDTOProps) {
    this.id = props.id;
    this.name = props.name;
  }
}
