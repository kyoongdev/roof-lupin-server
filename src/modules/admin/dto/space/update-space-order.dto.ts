import { Property } from 'wemacu-nestjs';

export interface UpdateSpaceOrderDTOProps {
  orderNo: number;
}

export class UpdateSpaceOrderDTO {
  @Property({ apiProperty: { type: 'number', description: '순서' } })
  orderNo: number;

  constructor(props?: UpdateSpaceOrderDTOProps) {
    if (props) {
      this.orderNo = props.orderNo;
    }
  }
}
