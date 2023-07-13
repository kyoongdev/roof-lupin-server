import { Property } from 'wemacu-nestjs';

import { CreateCurationDTO, CreateCurationDTOProps } from '@/modules/curation/dto';

export interface AdminCreateCurationDTOProps extends CreateCurationDTOProps {
  orderNo?: number;
}

export class AdminCreateCurationDTO extends CreateCurationDTO {
  @Property({ apiProperty: { type: 'number', description: '순서' } })
  orderNo?: number;

  constructor(props?: AdminCreateCurationDTOProps) {
    super(props);

    if (props) {
      this.orderNo = props.orderNo;
    }
  }
}
