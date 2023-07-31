import { Property } from 'cumuco-nestjs';

export class DeleteFileDTO {
  @Property({ apiProperty: { type: 'string' } })
  url: string;
}
