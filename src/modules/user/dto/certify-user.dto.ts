import { Property } from 'cumuco-nestjs';

export interface CertifyUserDTOProps {
  phoneNumber: string;
  name: string;
}

export class CertifyUserDTO {
  @Property({ apiProperty: { type: 'string', description: '휴대폰 번호' } })
  phoneNumber: string;

  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  constructor(props?: CertifyUserDTOProps) {
    if (props) {
      this.phoneNumber = props.phoneNumber;
      this.name = props.name;
    }
  }
}
