import { Property } from 'cumuco-nestjs';

export interface UpdateSpaceCategoryDTOProps {
  categoryId: string;
  orderNo: number;
}

export class UpdateSpaceCategoryDTO {
  @Property({ apiProperty: { type: 'string', description: '카테고리 id' } })
  categoryId: string;

  @Property({ apiProperty: { type: 'number', description: '카테고리 순서' } })
  orderNo: number;

  constructor(props?: UpdateSpaceCategoryDTOProps) {
    if (props) {
      this.categoryId = props.categoryId;
      this.orderNo = props.orderNo;
    }
  }
}
