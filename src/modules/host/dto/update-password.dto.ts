import { Property } from 'cumuco-nestjs';

export class UpdateHostPasswordDTO {
  @Property({ apiProperty: { type: 'string' } })
  email: string;

  @Property({ apiProperty: { type: 'string' } })
  phoneNumber: string;
}
