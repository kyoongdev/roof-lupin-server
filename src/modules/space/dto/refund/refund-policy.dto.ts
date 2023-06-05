import { Property } from 'wemacu-nestjs';

export interface RefundPolicyDTOProps {
  id: string;
  refundRate: number;
  dueDate: number;
  dueDateType: number;
}

export class RefundPolicyDTO {
  @Property({ apiProperty: { type: 'string', description: '환불 정책 id' } })
  id: string;

  @Property({ apiProperty: { type: 'number', description: '환불률' } })
  refundRate: number;

  @Property({ apiProperty: { type: 'number', description: '환불 기한' } })
  dueDate: number;

  @Property({ apiProperty: { type: 'number', description: '환불 기한 타입' } })
  dueDateType: number;

  constructor(props: RefundPolicyDTOProps) {
    this.id = props.id;
    this.refundRate = props.refundRate;
    this.dueDate = props.dueDate;
    this.dueDateType = props.dueDateType;
  }
}
