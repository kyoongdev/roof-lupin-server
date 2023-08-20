import { Property } from 'cumuco-nestjs';

import { HostDetailDTO, HostDetailDTOProps } from '@/modules/host/dto/host-detail.dto';

export interface AdminHostDetailDTOProps extends HostDetailDTOProps {
  isBlocked?: boolean;
  unBlockAt?: Date;
}

export class AdminHostDetailDTO extends HostDetailDTO {
  @Property({ apiProperty: { type: 'boolean', description: '차단 여부' } })
  isBlocked?: boolean;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '차단 해제 날짜' } })
  unBlockAt?: Date;

  constructor(props: AdminHostDetailDTOProps) {
    super(props);
    this.isBlocked = props.isBlocked;
    this.unBlockAt = props.unBlockAt;
  }
}
