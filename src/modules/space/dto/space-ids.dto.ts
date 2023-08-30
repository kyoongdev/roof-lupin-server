import { Property } from 'cumuco-nestjs';

export interface SpaceIdsDTOProps {
  id: string;
  title: string;
  thumbnail: string;
  isMain: boolean;
}

export class SpaceIdsDTO {
  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '공간 이름' } })
  title: string;

  @Property({ apiProperty: { type: 'string', description: '공간 썸네일' } })
  thumbnail: string;

  @Property({ apiProperty: { type: 'boolean', description: '메인 공간 여부' } })
  isMain: boolean;

  constructor(props: SpaceIdsDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.thumbnail = props.thumbnail;
    this.isMain = props.isMain;
  }
}
