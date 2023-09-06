import { Property } from 'cumuco-nestjs';

export interface ValidatedAccountDTOProps {
  isValid: boolean;
}

export class ValidatedAccountDTO {
  @Property({ apiProperty: { type: 'boolean', description: '계좌 유효성 여부' } })
  isValid: boolean;

  constructor(props: ValidatedAccountDTOProps) {
    this.isValid = props.isValid;
  }
}
