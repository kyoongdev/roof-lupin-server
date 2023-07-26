import { Property } from 'cumuco-nestjs';

//TODO: reportType reportStatus
export class CreateReportDTO {
  @Property({ apiProperty: { type: 'string', description: '공간 ID' } })
  spaceId: string;

  @Property({ apiProperty: { type: 'number', description: '신고 유형' } })
  reportType: number;

  @Property({ apiProperty: { type: 'string', description: '신고 제목' } })
  title: string;

  @Property({ apiProperty: { type: 'string', description: '신고 내용' } })
  content: string;
}
