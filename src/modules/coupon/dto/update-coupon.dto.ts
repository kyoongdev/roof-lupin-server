import { Property } from 'wemacu-nestjs';

export interface UpdateCouponDTOProps {
  name?: string;
  discountType?: number;
  discountValue?: number;
  description?: string;
  isLupinPay?: boolean;
}

export class UpdateCouponDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '쿠폰 이름' } })
  name?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '쿠폰 할인 타입' } })
  discountType?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '쿠폰 할인 값' } })
  discountValue?: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '쿠폰 설명' } })
  description?: string;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '루팡페이 쿠폰 여부' } })
  isLupinPay?: boolean;

  constructor(props?: UpdateCouponDTOProps) {
    if (props) {
      this.name = props.name;
      this.discountType = props.discountType;
      this.discountValue = props.discountValue;
      this.description = props.description;
      this.isLupinPay = props.isLupinPay;
    }
  }
}
