import { Property } from 'wemacu-nestjs';

import { DiscountTypeReqDecorator } from '../validation/discount-value.validation';

export interface CreateCouponDTOProps {
  name: string;
  discountType: number;
  discountValue: number;
  code?: string;
  description: string;
  isLupinPay: boolean;
  categoryIds?: string[];
  defaultDueDay: number;
}

export class CreateCouponDTO {
  @Property({ apiProperty: { type: 'string', description: '쿠폰 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '쿠폰 코드' } })
  code?: string;

  @DiscountTypeReqDecorator()
  discountType: number;

  @Property({ apiProperty: { type: 'number', description: '쿠폰 할인 값' } })
  discountValue: number;

  @Property({ apiProperty: { type: 'string', description: '쿠폰 설명' } })
  description: string;

  @Property({ apiProperty: { type: 'boolean', description: '루팡페이 쿠폰 여부' } })
  isLupinPay: boolean;

  @Property({ apiProperty: { type: 'number', description: '쿠폰 기본 유효기간' } })
  defaultDueDay: number;

  @Property({ apiProperty: { type: 'string', isArray: true, nullable: true, description: '카테고리 id 배열' } })
  categoryIds?: string[];

  constructor(props?: CreateCouponDTOProps) {
    if (props) {
      this.name = props.name;
      this.code = props.code;
      this.discountType = props.discountType;
      this.discountValue = props.discountValue;
      this.description = props.description;
      this.defaultDueDay = props.defaultDueDay;
      this.isLupinPay = props.isLupinPay;
      this.categoryIds = props.categoryIds;
    }
  }
}
