import { Property } from 'cumuco-nestjs';

import { UpdateCurationDTO, UpdateCurationDTOProps } from '@/modules/curation/dto';

export interface AdminUpdateCurationDTOProps extends UpdateCurationDTOProps {
  isMain?: boolean;
  orderNo?: number;
}

export class AdminUpdateCurationDTO extends UpdateCurationDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '순서' } })
  orderNo?: number;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '메인 큐레이션 여부' } })
  isMain?: boolean;

  constructor(props?: AdminUpdateCurationDTOProps) {
    super(props);
    if (props) {
      this.orderNo = props.orderNo;
      this.isMain = props.isMain;
    }
  }
}
