import { Property } from 'wemacu-nestjs';

export interface UpdateAdditionalServiceDTOProps {
  name: string;
  cost: number;
}

export class UpdateAdditionalServiceDTO {
  @Property({ apiProperty: { type: 'string', description: '추가 서비스 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'number', description: '추가 서비스 가격' } })
  cost: number;

  constructor(props?: UpdateAdditionalServiceDTOProps) {
    if (props) {
      this.name = props.name;
      this.cost = props.cost;
    }
  }
}
