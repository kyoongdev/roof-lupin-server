import { Property } from 'cumuco-nestjs';

export interface UpdateExhibitionSpaceDTOProps {
  spaceId: string;
  orderNo?: number;
}

export class UpdateExhibitionSpaceDTO {
  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  spaceId: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '순서' } })
  orderNo?: number;

  constructor(props?: UpdateExhibitionSpaceDTOProps) {
    if (props) {
      this.spaceId = props.spaceId;
      this.orderNo = props.orderNo;
    }
  }
}
