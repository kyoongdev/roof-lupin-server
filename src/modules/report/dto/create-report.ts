import { Property } from 'wemacu-nestjs';

//TODO: reportType reportStatus
export class CreateReportDTO {
  @Property({ apiProperty: { type: 'string' } })
  spaceId: string;

  @Property({ apiProperty: { type: 'number' } })
  reportType: number;
}
