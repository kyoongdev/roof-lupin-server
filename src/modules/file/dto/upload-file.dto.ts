import { Property } from 'wemacu-nestjs';

export class UploadedFileDTO {
  @Property({ apiProperty: { type: 'string' } })
  url: string;

  constructor(url?: string) {
    this.url = url;
  }
}
