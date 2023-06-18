import { Property } from 'wemacu-nestjs';

import { HostDTO, HostDTOProps } from '@/modules/host/dto';

export interface ReviewAnswerDTOProps {
  id: string;
  content: string;
  createdAt: Date;
  host: HostDTOProps;
}

export class ReviewAnswerDTO {
  @Property({ apiProperty: { type: 'string', description: '답변 아이디' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '답변 내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '생성 일자' } })
  createdAt: Date;

  @Property({ apiProperty: { type: HostDTO, description: '답변자' } })
  host: HostDTO;

  constructor(props: ReviewAnswerDTOProps) {
    this.id = props.id;
    this.content = props.content;
    this.createdAt = props.createdAt;
    this.host = new HostDTO(props.host);
  }
}
