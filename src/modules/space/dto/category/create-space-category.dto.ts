import { Property } from 'cumuco-nestjs';

export interface CreateSpaceCategoryDTOProps {
  categoryId: string;
  orderNo: number;
}

export class CreateSpaceCategoryDTO {
  @Property({ apiProperty: { type: 'string', description: '카테고리 id' } })
  categoryId: string;

  @Property({ apiProperty: { type: 'number', description: '카테고리 순서' } })
  orderNo: number;

  constructor(props?: CreateSpaceCategoryDTOProps) {
    if (props) {
      this.categoryId = props.categoryId;
      this.orderNo = props.orderNo;
    }
  }
}
