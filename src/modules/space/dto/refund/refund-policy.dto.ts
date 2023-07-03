import { Property } from 'wemacu-nestjs';

export interface RefundPolicyDTOProps {
  id: string;
  refundRate: number;
  daysBefore: number;
}

export class RefundPolicyDTO {
  @Property({ apiProperty: { type: 'string', description: '환불 정책 id' } })
  id: string;

  @Property({ apiProperty: { type: 'number', description: '환불률' } })
  refundRate: number;

  @Property({ apiProperty: { type: 'number', description: 'n일전 기한' } })
  daysBefore: number;

  constructor(props: RefundPolicyDTOProps) {
    this.id = props.id;
    this.refundRate = props.refundRate;
    this.daysBefore = props.daysBefore;
  }
}
