import { Property } from 'cumuco-nestjs';

export interface BankCodeDTOProps {
  code: string;
  name: string;
}

export class BankCodeDTO {
  @Property({ apiProperty: { type: 'string', description: '은행 코드' } })
  code: string;

  @Property({ apiProperty: { type: 'string', description: '은행 이름' } })
  name: string;

  constructor(props: BankCodeDTOProps) {
    this.code = props.code;
    this.name = props.name;
  }
}
