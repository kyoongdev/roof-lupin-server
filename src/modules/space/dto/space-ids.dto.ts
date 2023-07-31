import { Property } from 'cumuco-nestjs';

export interface SpaceIdsDTOProps {
  id: string;
  title: string;
  thumbnail: string;
}

export class SpaceIdsDTO {
  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '공간 이름' } })
  title: string;

  @Property({ apiProperty: { type: 'string', description: '공간 썸네일' } })
  thumbnail: string;

  constructor(props: SpaceIdsDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.thumbnail = props.thumbnail;
  }
}
