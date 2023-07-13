import { Property } from 'wemacu-nestjs';

export interface CreateExhibitionSpaceDTOProps {
  spaceId: string;
  orderNo?: number;
}

export class CreateExhibitionSpaceDTO {
  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  spaceId: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '순서' } })
  orderNo?: number;

  constructor(props?: CreateExhibitionSpaceDTOProps) {
    if (props) {
      this.spaceId = props.spaceId;
      this.orderNo = props.orderNo;
    }
  }
}
