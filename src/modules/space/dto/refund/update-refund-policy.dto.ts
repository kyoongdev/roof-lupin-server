import { Property } from 'cumuco-nestjs';

export interface UpdateRefundPolicyDTOProps {
  refundRate?: number;
  daysBefore?: number;
}

export class UpdateRefundPolicyDTO {
  @Property({ apiProperty: { type: 'number', description: '환불률', nullable: true } })
  refundRate?: number;

  @Property({ apiProperty: { type: 'number', description: 'n일전 기한', nullable: true } })
  daysBefore?: number;

  constructor(props?: UpdateRefundPolicyDTOProps) {
    if (props) {
      this.refundRate = props.refundRate;
      this.daysBefore = props.daysBefore;
    }
  }
}
