import { Property } from 'wemacu-nestjs';

export interface CreateRefundPolicyDTOProps {
  refundRate: number;
  dueDate: number;
  dueDateType: number;
}

export class CreateRefundPolicyDTO {
  @Property({ apiProperty: { type: 'number', description: '환불률' } })
  refundRate: number;

  @Property({ apiProperty: { type: 'number', description: '환불 기한' } })
  dueDate: number;

  @Property({ apiProperty: { type: 'number', description: '환불 기한 타입' } })
  dueDateType: number;

  constructor(props?: CreateRefundPolicyDTOProps) {
    if (props) {
      this.refundRate = props.refundRate;
      this.dueDate = props.dueDate;
      this.dueDateType = props.dueDateType;
    }
  }
}
