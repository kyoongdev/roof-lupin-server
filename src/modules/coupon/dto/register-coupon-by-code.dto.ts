import { Property } from 'cumuco-nestjs';

export interface RegisterCouponByCodeDTOProps {
  code: string;
}

export class RegisterCouponByCodeDTO {
  @Property({ apiProperty: { type: 'string', description: '쿠폰 코드' } })
  code: string;

  constructor(props?: RegisterCouponByCodeDTOProps) {
    if (props) {
      this.code = props.code;
    }
  }
}
