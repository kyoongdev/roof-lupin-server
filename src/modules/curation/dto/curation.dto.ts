import { Property } from 'cumuco-nestjs';

import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';

import { CurationSpaceDTO, CurationSpaceDTOProps } from './curation-space.dto';

export interface CurationDTOProps {
  id: string;
  title: string;
  subTitle: string;
  content: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
  orderNo?: number;
  spaces: CurationSpaceDTOProps[];
}

export class CurationDTO {
  @Property({ apiProperty: { type: 'string', description: '큐레이션 ID' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '큐레이션 제목' } })
  title: string;

  @Property({ apiProperty: { type: 'string', description: '큐레이션 부제목' } })
  subTitle: string;

  @Property({ apiProperty: { type: 'string', description: '큐레이션 썸네일' } })
  thumbnail: string;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '큐레이션 생성일' } })
  createdAt: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '큐레이션 수정일' } })
  updatedAt: Date;

  @Property({ apiProperty: { type: CurationSpaceDTO, isArray: true, description: '큐레이션 공간' } })
  spaces: CurationSpaceDTO[];

  @Property({ apiProperty: { type: 'number', description: '순서' } })
  orderNo?: number;

  constructor(props: CurationDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.subTitle = props.subTitle;
    this.thumbnail = props.thumbnail;
    this.createdAt = props.createdAt;
    this.orderNo = props.orderNo;
    this.updatedAt = props.updatedAt;
    this.spaces = props.spaces.map((space) => new CurationSpaceDTO(space));
  }
}
