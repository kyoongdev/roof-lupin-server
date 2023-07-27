import { Property } from 'cumuco-nestjs';

import { HostDTO, HostDTOProps } from './host.dto';

export interface HostAuthDetailDTOProps extends HostDTOProps {
  password: string;
  salt: string;
}

export class HostAuthDetailDTO extends HostDTO {
  @Property({ apiProperty: { type: 'string', description: '비밀번호' } })
  password: string;

  @Property({ apiProperty: { type: 'string', description: 'salt' } })
  salt: string;

  constructor(props: HostAuthDetailDTOProps) {
    super(props);
    this.password = props.password;
    this.salt = props.salt;
  }
}
