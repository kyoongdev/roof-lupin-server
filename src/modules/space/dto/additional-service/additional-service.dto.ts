import { Property } from 'cumuco-nestjs';

export interface AdditionalServiceDTOProps {
  id: string;
  name: string;
  cost: number;
  description?: string;
  tooltip?: string;
  maxCount?: number;
  rentalTypeId: string;
}

export class AdditionalServiceDTO {
  @Property({ apiProperty: { type: 'string', description: '추가 서비스 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '추가 서비스 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'number', description: '추가 서비스 가격' } })
  cost: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '추가 서비스 설명' } })
  description?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '추가 서비스 툴팁' } })
  tooltip?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '추가 서비스 최대 개수' } })
  maxCount?: number;

  @Property({ apiProperty: { type: 'string', description: '대여 상품 id' } })
  rentalTypeId: string;

  constructor(props: AdditionalServiceDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.cost = props.cost;
    this.description = props.description;
    this.tooltip = props.tooltip;
    this.maxCount = props.maxCount;
    this.rentalTypeId = props.rentalTypeId;
  }
}
