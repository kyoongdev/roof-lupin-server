import { ConfigService } from '@nestjs/config';

import { Property } from 'cumuco-nestjs';

import { CreatePaymentDTO } from '@/modules/reservation/dto';
import { RentalTypeDTO } from '@/modules/space/dto/rental-type';

import { EscrowProductDTO, EscrowProductDTOProps } from './escrow-product.dto';
import { ProductDTO, ProductDTOProps } from './product.dto';

export interface PaymentPayloadDTOProps {
  amount: number;
  orderId: string;
  orderName: string;
  successUrl: string;
  failUrl: string;
  customerEmail?: string;
  customerName?: string;
  appScheme?: string;
  taxFreeAmount?: number;
  taxExemptionAmount?: number;
  cultureExpense?: boolean;
  useEscrow?: boolean;
  escrowProducts?: EscrowProductDTOProps[];
  customerMobilePhone?: string;
  mobileCarrier?: string[];
  products?: ProductDTOProps[];
}

export class PaymentPayloadDTO {
  @Property({ apiProperty: { type: 'number', description: '가격' } })
  amount: number;

  @Property({ apiProperty: { type: 'string', description: '주문 구분 ID' } })
  orderId: string;

  @Property({ apiProperty: { type: 'string', description: '주문명' } })
  orderName: string;

  @Property({ apiProperty: { type: 'string', description: '성공 url' } })
  successUrl: string;

  @Property({ apiProperty: { type: 'string', description: '실패 url' } })
  failUrl: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '고객 이메일' } })
  customerEmail?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '고객 이름' } })
  customerName?: string;

  @Property({
    apiProperty: {
      type: 'string',
      nullable: true,
      description: '페이북/ISP앱에서 상점 앱으로 돌아올 때 사용되는 상점의 앱 스킴',
    },
  })
  appScheme?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '면세 금액' } })
  taxFreeAmount?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '과세를 제외한 결제금액 (컵 보증금 등)' } })
  taxExemptionAmount?: number;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '문화비 지출여부' } })
  cultureExpense?: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '에스크로 사용 여부' } })
  useEscrow?: boolean;

  @Property({
    apiProperty: {
      type: EscrowProductDTO,
      isArray: true,
      nullable: true,
      description: '상품 정보 객체 배열(가상계좌,계좌이체에서 에스크로 사용 시 필수)',
    },
  })
  escrowProducts?: EscrowProductDTO[];

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '고객의 휴대폰 번호, 가상계좌 입금 안내' } })
  customerMobilePhone?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, isArray: true, description: '휴대폰 결제창 통신사' } })
  mobileCarrier?: string[];

  @Property({ apiProperty: { type: ProductDTO, isArray: true, nullable: true, description: '상품 정보 객체' } })
  products?: ProductDTO[];

  constructor(props: PaymentPayloadDTOProps) {
    this.amount = props.amount;
    this.orderId = props.orderId;
    this.orderName = props.orderName;
    this.successUrl = props.successUrl;
    this.failUrl = props.failUrl;
    this.customerEmail = props.customerEmail;
    this.customerName = props.customerName;
    this.appScheme = props.appScheme;
    this.taxFreeAmount = props.taxFreeAmount;
    this.taxExemptionAmount = props.taxExemptionAmount;
    this.cultureExpense = props.cultureExpense;
    this.useEscrow = props.useEscrow;
    this.escrowProducts = props.escrowProducts?.map((product) => new EscrowProductDTO(product));
    this.customerMobilePhone = props.customerMobilePhone;
    this.mobileCarrier = props.mobileCarrier;
    this.products = props.products?.map((product) => new ProductDTO(product));
  }

  static generatePaymentPayload(
    orderId: string,
    rentalTypes: RentalTypeDTO[],
    props: CreatePaymentDTO
  ): PaymentPayloadDTO {
    const config = new ConfigService();
    const orderName =
      rentalTypes.length > 1 ? `${rentalTypes[0].name} 외 ${rentalTypes.length - 1}건` : rentalTypes[0].name;

    return new PaymentPayloadDTO({
      amount: props.totalCost,
      orderId,
      orderName,
      successUrl: config.get(''),
      failUrl: config.get(''),
    });
  }
}
