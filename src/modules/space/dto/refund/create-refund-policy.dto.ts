import { Property } from 'wemacu-nestjs';

export interface CreateRefundPolicyDTOProps {
  refundRate: number;
  daysBefore: number;
  daysBeforeType: number;
}

export class CreateRefundPolicyDTO {
  @Property({ apiProperty: { type: 'number', description: '환불률' } })
  refundRate: number;

  @Property({ apiProperty: { type: 'number', description: '환불 기한' } })
  daysBefore: number;

  constructor(props?: CreateRefundPolicyDTOProps) {
    if (props) {
      this.refundRate = props.refundRate;
      this.daysBefore = props.daysBefore;
    }
  }
}
