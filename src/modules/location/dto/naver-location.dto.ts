import { Property } from 'wemacu-nestjs';

export class NaverLocationDTO {
  @Property({ apiProperty: { type: 'string', description: '상태' } })
  status: string;
}
