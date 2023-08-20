import { Property } from 'cumuco-nestjs';

import { HostDTO, HostDTOProps } from '@/modules/host/dto';

export interface AdminHostDTOProps extends HostDTOProps {
  unBlockAt?: Date;
  isBlocked?: boolean;
}

export class AdminHostDTO extends HostDTO {
  @Property({ apiProperty: { type: 'boolean', description: '차단 여부' } })
  isBlocked?: boolean;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '차단 해제 날짜' } })
  unBlockAt?: Date;

  constructor(props: AdminHostDTOProps) {
    super(props);
    this.isBlocked = props.isBlocked;
    this.unBlockAt = props.unBlockAt;
  }
}
