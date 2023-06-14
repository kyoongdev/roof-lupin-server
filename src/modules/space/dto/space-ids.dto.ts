import { Property } from 'wemacu-nestjs';

export interface SpaceIdsDTOProps {
  ids: string[];
}

export class SpaceIdsDTO {
  @Property({ apiProperty: { type: 'string', isArray: true, description: '공간 id들' } })
  ids: string[];

  constructor(props: SpaceIdsDTOProps) {
    this.ids = props.ids;
  }
}
