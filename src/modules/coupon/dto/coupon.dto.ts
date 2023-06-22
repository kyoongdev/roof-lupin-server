import { Property } from 'wemacu-nestjs';

import { CategoryDTO, CategoryDTOProps } from '@/modules/category/dto';

export interface CouponDTOProps {
  id: string;
  name: string;
  discountType: number;
  discountValue: number;
  description: string;
  code: string;
  isLupinPay: boolean;
  categories: CategoryDTOProps[];
}

export class CouponDTO {
  @Property({ apiProperty: { type: 'string', description: '쿠폰 ID' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '쿠폰 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'number', description: '쿠폰 할인 타입' } })
  discountType: number;

  @Property({ apiProperty: { type: 'number', description: '쿠폰 할인 값' } })
  discountValue: number;

  @Property({ apiProperty: { type: 'string', description: '쿠폰 설명' } })
  description: string;

  @Property({ apiProperty: { type: 'string', description: '쿠폰 코드' } })
  code: string;

  @Property({ apiProperty: { type: 'boolean', description: '루팡페이 쿠폰 여부' } })
  isLupinPay: boolean;

  @Property({ apiProperty: { type: CategoryDTO, isArray: true, nullable: true, description: '쿠폰 카테고리' } })
  categories?: CategoryDTO[];

  constructor(props: CouponDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.discountType = props.discountType;
    this.discountValue = props.discountValue;
    this.description = props.description;
    this.code = props.code;
    this.isLupinPay = props.isLupinPay;
    this.categories = props.categories ? props.categories.map((category) => new CategoryDTO(category)) : null;
  }
}
