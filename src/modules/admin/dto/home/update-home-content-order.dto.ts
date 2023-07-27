import { Property } from 'cumuco-nestjs';

export interface UpdateHomeContentOrderDTOProps {
  orderNo: number;
}

export class UpdateHomeContentOrderDTO {
  @Property({ apiProperty: { type: 'number', description: '순서' } })
  orderNo: number;

  constructor(props?: UpdateHomeContentOrderDTOProps) {
    if (props) {
      this.orderNo = props.orderNo;
    }
  }
}
