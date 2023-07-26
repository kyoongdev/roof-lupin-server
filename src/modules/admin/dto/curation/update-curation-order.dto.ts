import { Property } from 'wemacu-nestjs';

export interface AdminUpdateCurationOrderDTOProps {
  orderNo: number;
}

export class AdminUpdateCurationOrderDTO {
  @Property({ apiProperty: { type: 'number', description: '순서' } })
  orderNo: number;

  constructor(props?: AdminUpdateCurationOrderDTOProps) {
    if (props) {
      this.orderNo = props.orderNo;
    }
  }
}
