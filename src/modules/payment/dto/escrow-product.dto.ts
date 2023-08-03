import { Property } from 'cumuco-nestjs';

export interface EscrowProductDTOProps {
  id: string;
  name: string;
  code: string;
  unitPrice: string;
  quantity: string;
}

export class EscrowProductDTO {
  @Property({ apiProperty: { type: 'string', description: '상품의 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '상품의 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', description: '상품 관리 코드' } })
  code: string;

  @Property({ apiProperty: { type: 'string', description: '상품 가격' } })
  unitPrice: string;

  @Property({ apiProperty: { type: 'string', description: '상뭎 수량' } })
  quantity: string;

  constructor(props: EscrowProductDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.code = props.code;
    this.unitPrice = props.unitPrice;
    this.quantity = props.quantity;
  }
}
