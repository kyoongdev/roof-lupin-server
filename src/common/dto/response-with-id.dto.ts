import { Property } from 'cumuco-nestjs';

export class ResponseWithIdDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  constructor(id?: string) {
    this.id = id;
  }
}
