import { Property } from 'wemacu-nestjs';

export class AdminUpdateReportDTO {
  @Property({ apiProperty: { type: 'number', description: '1 = 처리중, 2  = 처리 완료' } })
  reportStatus: number;
}
