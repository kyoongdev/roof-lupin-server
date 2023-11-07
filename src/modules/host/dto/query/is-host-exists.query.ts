import { Property } from 'cumuco-nestjs';

export class IsHostExistsQuery {
  @Property({ apiProperty: { type: 'string' } })
  email: string;
}
