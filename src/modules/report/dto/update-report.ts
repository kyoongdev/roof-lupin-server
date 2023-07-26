import { Property } from 'cumuco-nestjs';

//INFO: 유저용
export class UpdateReportDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '신고 유형' } })
  reportType?: number;

  @Property({ apiProperty: { type: 'string', description: '신고 제목', nullable: true } })
  title?: string;

  @Property({ apiProperty: { type: 'string', description: '신고 내용', nullable: true } })
  content?: string;
}
