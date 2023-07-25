import { Property } from 'wemacu-nestjs';

export interface CreateAdditionalServiceDTOProps {
  name: string;
  cost: number;
  description?: string;
  tooltip?: string;
  maxCount?: number;
}

export class CreateAdditionalServiceDTO {
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

  constructor(props?: CreateAdditionalServiceDTOProps) {
    if (props) {
      this.name = props.name;
      this.cost = props.cost;
      this.description = props.description;
      this.tooltip = props.tooltip;
      this.maxCount = props.maxCount;
    }
  }
}
