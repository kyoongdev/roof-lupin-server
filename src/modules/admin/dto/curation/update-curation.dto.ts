import { Property } from 'cumuco-nestjs';

import { UpdateCurationDTO, UpdateCurationDTOProps } from '@/modules/curation/dto';

export interface AdminUpdateCurationDTOProps extends UpdateCurationDTOProps {
  orderNo?: number;
}

export class AdminUpdateCurationDTO extends UpdateCurationDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '순서' } })
  orderNo?: number;

  constructor(props?: AdminUpdateCurationDTOProps) {
    super(props);
    if (props) {
      this.orderNo = props.orderNo;
    }
  }
}
