import { Property } from 'cumuco-nestjs';

import { DiscountTypeReqDecorator } from '../validation/discount-value.validation';

export interface UpdateCouponDTOProps {
  name?: string;
  discountType?: number;
  discountValue?: number;
  code?: string;
  description?: string;
  isLupinPay?: boolean;
  defaultDueDateStart?: Date;
  defaultDueDay?: number;

  link?: string;
}

export class UpdateCouponDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '쿠폰 이름' } })
  name?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, minLength: 10, maxLength: 11, description: '쿠폰 코드' } })
  code?: string;

  @DiscountTypeReqDecorator(true)
  discountType?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '쿠폰 할인 값' } })
  discountValue?: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '쿠폰 설명' } })
  description?: string;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '루팡페이 쿠폰 여부' } })
  isLupinPay?: boolean;

  @Property({
    apiProperty: { type: 'string', format: 'date-time', nullable: true, description: '쿠폰 기본 유효기간 시작 날짜' },
  })
  defaultDueDateStart?: Date;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '쿠폰 기본 유효기간' } })
  defaultDueDay?: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '쿠폰 링크' } })
  link?: string;

  constructor(props?: UpdateCouponDTOProps) {
    if (props) {
      this.name = props.name;
      this.code = props.code;
      this.discountType = props.discountType;
      this.discountValue = props.discountValue;
      this.description = props.description;
      this.isLupinPay = props.isLupinPay;

      this.defaultDueDateStart = props.defaultDueDateStart;
      this.defaultDueDay = props.defaultDueDay;
      this.link = props.link;
    }
  }
}
