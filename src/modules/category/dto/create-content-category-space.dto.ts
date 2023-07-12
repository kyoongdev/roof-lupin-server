import { Property } from 'wemacu-nestjs';

export interface CreateContentCategorySpaceDTOProps {
  orderNo: number;
  spaceId: string;
}

export class CreateContentCategorySpaceDTO {
  @Property({ apiProperty: { type: 'number', description: '순서' } })
  orderNo: number;

  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  spaceId: string;

  constructor(props?: CreateContentCategorySpaceDTOProps) {
    if (props) {
      this.orderNo = props.orderNo;
      this.spaceId = props.spaceId;
    }
  }
}
