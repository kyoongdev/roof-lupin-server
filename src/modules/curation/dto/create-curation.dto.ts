import { Property } from 'cumuco-nestjs';

import { CreateCurationSpaceDTO, CreateCurationSpaceDTOProps } from './create-curation-space.dto';

export interface CreateCurationDTOProps {
  title: string;
  subTitle: string;
  content: string;
  spaceTitle?: string;
  thumbnail: string;
  spaces?: CreateCurationSpaceDTOProps[];
}

export class CreateCurationDTO {
  @Property({ apiProperty: { type: 'string', description: '큐레이션 제목' } })
  title: string;

  @Property({ apiProperty: { type: 'string', description: '큐레이션 부제목' } })
  subTitle: string;

  @Property({ apiProperty: { type: 'string', description: '큐레이션 내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '큐레이션 공간 제목' } })
  spaceTitle?: string;

  @Property({ apiProperty: { type: 'string', description: '큐레이션 썸네일' } })
  thumbnail: string;

  @Property({ apiProperty: { type: CreateCurationSpaceDTO, isArray: true, nullable: true, description: '공간 ids' } })
  spaces?: CreateCurationSpaceDTO[];

  constructor(props?: CreateCurationDTOProps) {
    if (props) {
      this.title = props.title;
      this.subTitle = props.subTitle;
      this.content = props.content;
      this.spaceTitle = props.spaceTitle;
      this.thumbnail = props.thumbnail;
      this.spaces = props.spaces?.map((space) => new CreateCurationSpaceDTO(space));
    }
  }
}
