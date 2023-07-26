import { Property } from 'cumuco-nestjs';

import { ProductItem } from '@/interface/payment/naver.interface';

export type NaverProductItemDTOProps = ProductItem;

export class NaverProductItemDTO {
  @Property({ apiProperty: { type: 'string', description: '결제 상품 유형' } })
  categoryType: string;

  @Property({ apiProperty: { type: 'string', description: '상품 카테고리 ID' } })
  categoryId: string;

  @Property({ apiProperty: { type: 'string', description: '상품명' } })
  name: string;

  @Property({ apiProperty: { type: 'string', description: '상품 식별키' } })
  uid: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '유입경로' } })
  payReferrer?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '시작일' } })
  startDate?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '종료일' } })
  endDate?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '판매자 식별키' } })
  sellerId?: string;

  @Property({ apiProperty: { type: 'number', description: '상품 개수' } })
  count: number;

  constructor(props: NaverProductItemDTOProps) {
    this.categoryType = props.categoryType;
    this.categoryId = props.categoryId;
    this.name = props.name;
    this.uid = props.uid;
    this.payReferrer = props.payReferrer;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.sellerId = props.sellerId;
    this.count = props.count;
  }
}
