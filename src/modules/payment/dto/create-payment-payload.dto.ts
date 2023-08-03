import { Property } from 'cumuco-nestjs';

import { CreatePaymentDTO } from '@/modules/reservation/dto';

export class CreatePaymentPayloadDTO extends CreatePaymentDTO {
  @Property({ apiProperty: { type: 'string', description: '결제 종류' } })
  payType: string;
}
