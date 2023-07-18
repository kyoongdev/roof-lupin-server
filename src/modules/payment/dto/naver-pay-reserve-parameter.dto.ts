import { Property } from 'wemacu-nestjs';

import { PayReserveParameters } from '@/interface/payment/naver.interface';

import { NaverProductItemDTO } from './naver-product-item.dto';

export type NaverPayReserveParametersDTOProps = PayReserveParameters;

export class NaverPayReserveParametersDTO {
  @Property({ apiProperty: { type: 'string', description: '가맹점 결제번호 또는 주문번호' } })
  merchantPayKey: string;

  @Property({ apiProperty: { type: 'string', description: '가맹점 사용자 키' } })
  merchantUserKey: string;

  @Property({ apiProperty: { type: 'string', description: '상품명' } })
  productName: string;

  @Property({ apiProperty: { type: 'number', description: '상품 수량 ex) A 2개, B 1개 -> 3' } })
  productCount: number;

  @Property({ apiProperty: { type: 'number', description: '총 결제 금액' } })
  totalPayAmount: number;

  @Property({ apiProperty: { type: 'number', description: '과세 대상 금액' } })
  taxScopeAmount: number;

  @Property({ apiProperty: { type: 'number', description: '면세 대상 금액' } })
  taxExScopeAmount: number;

  @Property({ apiProperty: { type: 'string', description: '결제 인증 결과 전달 URL' } })
  returnUrl: string;

  @Property({ apiProperty: { type: 'string', description: '구매자 성명' } })
  purchaserName: string;

  @Property({ apiProperty: { type: 'string', description: '구매자 생년월일' } })
  purchaserBirthDay: string;

  @Property({ apiProperty: { type: NaverProductItemDTO, isArray: true, description: 'productItem 배열' } })
  productItems: NaverProductItemDTO[];

  constructor(props: NaverPayReserveParametersDTOProps) {
    this.merchantPayKey = props.merchantPayKey;
    this.merchantUserKey = props.merchantUserKey;
    this.productName = props.productName;
    this.productCount = props.productCount;
    this.totalPayAmount = props.totalPayAmount;
    this.taxScopeAmount = props.taxScopeAmount;
    this.taxExScopeAmount = props.taxExScopeAmount;
    this.returnUrl = props.returnUrl;
    this.purchaserName = props.purchaserName;
    this.purchaserBirthDay = props.purchaserBirthDay;
    this.productItems = props.productItems.map((item) => new NaverProductItemDTO(item));
  }
}
