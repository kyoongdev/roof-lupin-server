import { Property } from 'wemacu-nestjs';

import { UpdateContentCategorySpaceDTO, UpdateContentCategorySpaceDTOProps } from './Update-content-category-space.dto';

export interface UpdateContentCategoryDTOProps {
  name?: string;
  highlight?: string;
  spaces?: UpdateContentCategorySpaceDTOProps[];
}

export class UpdateContentCategoryDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '이름' } })
  name?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '하이라이트 텍스트' } })
  highlight?: string;

  @Property({
    apiProperty: { type: UpdateContentCategorySpaceDTO, isArray: true, nullable: true, description: '공간' },
  })
  spaces?: UpdateContentCategorySpaceDTO[];

  constructor(props?: UpdateContentCategoryDTOProps) {
    if (props) {
      this.name = props.name;
      this.highlight = props.highlight;
      this.spaces = props.spaces.map((space) => new UpdateContentCategorySpaceDTO(space));
    }
  }
}
