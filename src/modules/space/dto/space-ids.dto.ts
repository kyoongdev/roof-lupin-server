import { Property } from 'cumuco-nestjs';

export interface SpaceIdsDTOProps {
  id: string;
  title: string;
}

export class SpaceIdsDTO {
  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '공간 이름' } })
  title: string;

  constructor(props: SpaceIdsDTOProps) {
    this.id = props.id;
    this.title = props.title;
  }
}
