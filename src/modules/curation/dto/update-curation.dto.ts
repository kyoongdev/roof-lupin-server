import { Property } from 'wemacu-nestjs';

import { UpdateCurationSpaceDTO, UpdateCurationSpaceDTOProps } from './update-curation-space.dto';

export interface UpdateCurationDTOProps {
  title?: string;
  subTitle?: string;
  content?: string;
  thumbnail?: string;

  spaces?: UpdateCurationSpaceDTOProps[];
}

export class UpdateCurationDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '큐레이션 제목' } })
  title?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '큐레이션 부제목' } })
  subTitle?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '큐레이션 내용' } })
  content?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '큐레이션 썸네일' } })
  thumbnail?: string;

  @Property({ apiProperty: { type: UpdateCurationSpaceDTO, isArray: true, nullable: true, description: '공간' } })
  spaces?: UpdateCurationSpaceDTO[];

  constructor(props?: UpdateCurationDTOProps) {
    if (props) {
      this.title = props.title;
      this.subTitle = props.subTitle;
      this.content = props.content;
      this.thumbnail = props.thumbnail;

      this.spaces = props.spaces?.map((space) => new UpdateCurationSpaceDTO(space));
    }
  }
}
