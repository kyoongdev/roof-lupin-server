import { Property } from 'cumuco-nestjs';

export interface CreateContentCategorySpaceDTOProps {
  orderNo?: number;
  spaceId: string;
}

export class CreateContentCategorySpaceDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '순서' } })
  orderNo?: number;

  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  spaceId: string;

  constructor(props?: CreateContentCategorySpaceDTOProps) {
    if (props) {
      this.orderNo = props.orderNo || null;
      this.spaceId = props.spaceId;
    }
  }
}
