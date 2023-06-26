import { Property } from 'wemacu-nestjs';

export interface AdditionalServiceDTOProps {
  id: string;
  name: string;
  cost: number;
}

export class AdditionalServiceDTO {
  @Property({ apiProperty: { type: 'string', description: '추가 서비스 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '추가 서비스 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'number', description: '추가 서비스 가격' } })
  cost: number;

  constructor(props: AdditionalServiceDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.cost = props.cost;
  }
}
