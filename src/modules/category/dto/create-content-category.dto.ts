import { Property } from 'wemacu-nestjs';

import { CreateContentCategorySpaceDTO, CreateContentCategorySpaceDTOProps } from './create-content-category-space.dto';

export interface CreateContentCategoryDTOProps {
  name: string;
  highlight?: string;
  spaces: CreateContentCategorySpaceDTOProps[];
}

export class CreateContentCategoryDTO {
  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '하이라이트 텍스트' } })
  highlight?: string;

  @Property({ apiProperty: { type: CreateContentCategorySpaceDTO, isArray: true, description: '공간' } })
  spaces: CreateContentCategorySpaceDTO[];

  constructor(props?: CreateContentCategoryDTOProps) {
    if (props) {
      this.name = props.name;
      this.highlight = props.highlight;
      this.spaces = props.spaces.map((space) => new CreateContentCategorySpaceDTO(space));
    }
  }
}
