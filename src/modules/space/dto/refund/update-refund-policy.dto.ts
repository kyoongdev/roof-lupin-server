import { Property } from 'wemacu-nestjs';

export interface UpdateRefundPolicyDTOProps {
  refundRate?: number;
  dueDate?: number;
  dueDateType?: number;
}

export class UpdateRefundPolicyDTO {
  @Property({ apiProperty: { type: 'number', description: '환불률', nullable: true } })
  refundRate: number;

  @Property({ apiProperty: { type: 'number', description: '환불 기한', nullable: true } })
  dueDate: number;

  @Property({ apiProperty: { type: 'number', description: '환불 기한 타입', nullable: true } })
  dueDateType?: number;

  constructor(props?: UpdateRefundPolicyDTOProps) {
    if (props) {
      this.refundRate = props.refundRate;
      this.dueDate = props.dueDate;
      this.dueDateType = props.dueDateType;
    }
  }
}
