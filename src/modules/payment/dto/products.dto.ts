import { Property } from 'cumuco-nestjs';

export interface ProductDTOProps {
  name: string;
  quantity: number;
  unitAmount: number;
  currency: string;
  description: string;
}

export class ProductDTO {
  @Property({ apiProperty: { type: 'string', description: '상품 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', description: '상품 수량' } })
  quantity: number;

  @Property({ apiProperty: { type: 'string', description: '상품 가격' } })
  unitAmount: number;

  @Property({ apiProperty: { type: 'string', description: '통화' } })
  currency: string;

  @Property({ apiProperty: { type: 'string', description: '설명' } })
  description: string;

  constructor(props: ProductDTOProps) {
    this.name = props.name;
    this.quantity = props.quantity;
    this.unitAmount = props.unitAmount;
    this.currency = props.currency;
    this.description = props.description;
  }
}
