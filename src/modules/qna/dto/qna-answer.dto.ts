import { Property } from 'cumuco-nestjs';

import { DateDTO, type DateDTOProps } from '@/common';
import { HostDTO, type HostDTOProps } from '@/modules/host/dto/host.dto';

export interface QnAAnswerDTOProps extends DateDTOProps {
  id: string;
  content: string;
  spaceQnAId: string;
  host: HostDTOProps;
}

export class QnAAnswerDTO extends DateDTO {
  @Property({ apiProperty: { type: 'string', description: '답변 ID' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '답변 내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', description: 'qna ID' } })
  qnaId: string;

  @Property({ apiProperty: { type: HostDTO, description: '호스트' } })
  host: HostDTO;

  constructor(props: QnAAnswerDTOProps) {
    super(props);
    this.id = props.id;
    this.content = props.content;
    this.qnaId = props.spaceQnAId;
    this.host = new HostDTO(props.host);
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
