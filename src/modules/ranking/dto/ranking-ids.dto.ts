import { Property } from 'wemacu-nestjs';

export interface RankingIdsDTOProps {
  ids: string[];
}

export class RankingIdsDTO {
  @Property({ apiProperty: { type: 'string', isArray: true, description: '공간 id들' } })
  ids: string[];

  constructor(props: RankingIdsDTOProps) {
    this.ids = props.ids;
  }
}
