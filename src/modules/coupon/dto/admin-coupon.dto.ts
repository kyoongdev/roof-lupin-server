import { InternalServerErrorException } from '@nestjs/common';

import { Property } from 'wemacu-nestjs';

import { CategoryDTO, CategoryDTOProps } from '@/modules/category/dto';

import { DISCOUNT_TYPE_VALUES, DiscountTypeResTransform } from '../validation/discount-value.validation';

export interface AdminCouponDTOProps {
  id: string;
  name: string;
  discountType: number;
  discountValue: number;
  description: string;
  code: string;
  isLupinPay: boolean;
  defaultDueDay: number;
  categories: CategoryDTOProps[];
}

export class AdminCouponDTO {
  @Property({ apiProperty: { type: 'string', description: '쿠폰 ID' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '쿠폰 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', description: '쿠폰 코드' } })
  code: string;

  @DiscountTypeResTransform()
  @Property({ apiProperty: { type: 'string', description: '쿠폰 할인 타입', example: DISCOUNT_TYPE_VALUES.join(',') } })
  discountType: number;

  @Property({ apiProperty: { type: 'number', description: '쿠폰 할인 값' } })
  discountValue: number;

  @Property({ apiProperty: { type: 'string', description: '쿠폰 설명' } })
  description: string;

  @Property({ apiProperty: { type: 'boolean', description: '루팡페이 쿠폰 여부' } })
  isLupinPay: boolean;

  @Property({ apiProperty: { type: 'number', description: '쿠폰 기본 유효기간' } })
  defaultDueDay: number;

  @Property({ apiProperty: { type: CategoryDTO, isArray: true, nullable: true, description: '쿠폰 카테고리' } })
  categories?: CategoryDTO[];

  constructor(props: AdminCouponDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.discountType = props.discountType;
    this.discountValue = props.discountValue;
    this.description = props.description;
    this.code = props.code;
    this.defaultDueDay = props.defaultDueDay;
    this.isLupinPay = props.isLupinPay;
    this.categories = props.categories ? props.categories.map((category) => new CategoryDTO(category)) : null;
  }
}
