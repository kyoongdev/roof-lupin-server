import { Property } from 'wemacu-nestjs';

export class UpdateHostPasswordDTO {
  @Property({ apiProperty: { type: 'string' } })
  email: string;

  @Property({ apiProperty: { type: 'string' } })
  password: string;

  @Property({ apiProperty: { type: 'string' } })
  phoneNumber: string;
}
