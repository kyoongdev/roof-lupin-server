import { Property } from 'cumuco-nestjs';

export class CancelReservationQuery {
  @Property({ apiProperty: { type: 'string', description: '이유' } })
  reason: string;
}
