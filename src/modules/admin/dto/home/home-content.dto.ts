import { Property } from 'wemacu-nestjs';

import { HomeContentsDTO, HomeContentsDTOProps } from '@/modules/home/dto';

export interface AdminHomeContentDTOProps extends HomeContentsDTOProps {
  orderNo: number;
}

export class AdminHomeContentDTO extends HomeContentsDTO {
  @Property({ apiProperty: { type: 'number', description: '순서' } })
  orderNo: number;

  constructor(props: AdminHomeContentDTOProps) {
    super(props);
    this.orderNo = props.orderNo;
  }
}
