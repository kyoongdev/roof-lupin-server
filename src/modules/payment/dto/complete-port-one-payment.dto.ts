import { Property } from 'cumuco-nestjs';

export class CompletePortOnePaymentDTO {
  @Property({ apiProperty: { type: 'string', description: '가맹점 주문번호' } })
  merchant_uid: string;

  @Property({ apiProperty: { type: 'string', description: '결제 고유번호' } })
  imp_uid: string;
}
