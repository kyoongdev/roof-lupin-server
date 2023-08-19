import { InternalServerErrorException } from '@nestjs/common';

import { Property } from 'cumuco-nestjs';

import { CategoryDTO, CategoryDTOProps } from '@/modules/category/dto';

import { DISCOUNT_TYPE_VALUES, DiscountTypeResTransform } from '../validation/discount-value.validation';

export interface CouponDTOProps {
  id: string;
  name: string;

  discountType: number;
  discountValue: number;
  description: string;
  isLupinPay: boolean;
  defaultDueDateStart?: Date;
  defaultDueDay: number;
}

export class CouponDTO {
  @Property({ apiProperty: { type: 'string', description: '쿠폰 ID' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '쿠폰 이름' } })
  name: string;

  @DiscountTypeResTransform()
  @Property({ apiProperty: { type: 'string', description: '쿠폰 할인 타입', example: DISCOUNT_TYPE_VALUES.join(',') } })
  discountType: number;

  @Property({ apiProperty: { type: 'number', description: '쿠폰 할인 값' } })
  discountValue: number;

  @Property({ apiProperty: { type: 'string', description: '쿠폰 설명' } })
  description: string;

  @Property({ apiProperty: { type: 'boolean', description: '루팡페이 쿠폰 여부' } })
  isLupinPay: boolean;

  @Property({
    apiProperty: { type: 'string', format: 'date-time', nullable: true, description: '쿠폰 기본 유효기간 시작 날짜' },
  })
  defaultDueDateStart?: Date;

  @Property({ apiProperty: { type: 'number', description: '쿠폰 기본 유효기간' } })
  defaultDueDay: number;

  @Property({ apiProperty: { type: CategoryDTO, isArray: true, nullable: true, description: '쿠폰 카테고리' } })
  categories?: CategoryDTO[];

  constructor(props: CouponDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.discountType = props.discountType;
    this.discountValue = props.discountValue;
    this.description = props.description;
    this.defaultDueDateStart = props.defaultDueDateStart || null;
    this.defaultDueDay = props.defaultDueDay;
    this.isLupinPay = props.isLupinPay;
  }
}
