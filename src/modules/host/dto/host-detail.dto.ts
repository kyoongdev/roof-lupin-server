import { Property } from 'cumuco-nestjs';

import { HostAccountDTO, HostAccountDTOProps } from './host-account.dto';
import { HostDTO, type HostDTOProps } from './host.dto';

export interface HostDetailDTOProps extends HostDTOProps {
  hostAccount: HostAccountDTOProps;
}

export class HostDetailDTO extends HostDTO {
  @Property({ apiProperty: { type: HostAccountDTO, description: '호스트 계좌 정보', nullable: true } })
  account: HostAccountDTO;

  constructor(props: HostDetailDTOProps) {
    super(props);
    this.account = props.hostAccount ? new HostAccountDTO(props.hostAccount) : null;
  }
}
