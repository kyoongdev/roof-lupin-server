import { Property } from 'cumuco-nestjs';

export interface CreateRankingSpaceDTOProps {
  orderNo: number;
  spaceId: string;
}

export class CreateRankingSpaceDTO {
  @Property({ apiProperty: { type: 'number', description: '순서' } })
  orderNo: number;

  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  spaceId: string;

  constructor(props?: CreateRankingSpaceDTOProps) {
    if (props) {
      this.orderNo = props.orderNo;
      this.spaceId = props.spaceId;
    }
  }
}
