import { Property } from 'wemacu-nestjs';

export interface UpdateExhibitionOrderDTOProps {
  orderNo: number;
}

export class UpdateExhibitionOrderDTO {
  @Property({ apiProperty: { type: 'number', description: '순사' } })
  orderNo: number;

  constructor(props?: UpdateExhibitionOrderDTOProps) {
    if (props) {
      this.orderNo = props.orderNo;
    }
  }
}
