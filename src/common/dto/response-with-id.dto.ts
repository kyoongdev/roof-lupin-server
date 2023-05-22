import { Property } from 'wemacu-nestjs';

export class ResponseWithIdDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;
}
