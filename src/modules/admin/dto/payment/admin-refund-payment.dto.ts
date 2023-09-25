import { Property } from 'cumuco-nestjs';

export class AdminRefundPaymentDTO {
  @Property({ apiProperty: { type: 'number', description: '환불금액' } })
  refundCost: number;
}
