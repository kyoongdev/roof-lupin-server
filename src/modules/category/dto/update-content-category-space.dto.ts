import { Property } from 'wemacu-nestjs';

export interface UpdateContentCategorySpaceDTOProps {
  orderNo?: number;
  spaceId: string;
}

export class UpdateContentCategorySpaceDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '순서' } })
  orderNo?: number;

  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  spaceId: string;

  constructor(props?: UpdateContentCategorySpaceDTOProps) {
    if (props) {
      this.orderNo = props.orderNo;
      this.spaceId = props.spaceId;
    }
  }
}
