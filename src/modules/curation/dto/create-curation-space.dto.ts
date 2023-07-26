import { Property } from 'cumuco-nestjs';

export interface CreateCurationSpaceDTOProps {
  orderNo?: number;
  spaceId: string;
}

export class CreateCurationSpaceDTO {
  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  spaceId: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '순서' } })
  orderNo?: number;

  constructor(props?: CreateCurationSpaceDTOProps) {
    if (props) {
      this.spaceId = props.spaceId;
      this.orderNo = props.orderNo;
    }
  }
}
