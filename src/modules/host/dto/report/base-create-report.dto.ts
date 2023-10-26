import { Property } from 'cumuco-nestjs';

export interface HostBaseCreateReportDTOProps {
  content: string;
}

export class HostBaseCreateReportDTO {
  @Property({ apiProperty: { type: 'string', description: '신고 내용' } })
  content: string;

  constructor(props?: HostBaseCreateReportDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
