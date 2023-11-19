import { Property } from 'cumuco-nestjs';

import { CreateCurationDTO, CreateCurationDTOProps } from '@/modules/curation/dto';

export interface AdminCreateCurationDTOProps extends CreateCurationDTOProps {
  orderNo?: number;
  isMain?: boolean;
}

export class AdminCreateCurationDTO extends CreateCurationDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '순서' } })
  orderNo?: number;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '메인 큐레이션 여부' } })
  isMain?: boolean;

  constructor(props?: AdminCreateCurationDTOProps) {
    super(props);

    if (props) {
      this.orderNo = props.orderNo;
      this.isMain = props.isMain;
    }
  }
}
