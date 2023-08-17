import { Property } from 'cumuco-nestjs';

export interface BaseCreateReportDTOProps {
  content: string;
}

export class BaseCreateReportDTO {
  @Property({ apiProperty: { type: 'string', description: '신고 내용' } })
  content: string;

  constructor(props?: BaseCreateReportDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
