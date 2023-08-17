import { Property } from 'cumuco-nestjs';

import { AdminDTO, AdminDTOProps } from '@/modules/admin/dto';

export interface ReportAnswerDTOProps {
  id: string;
  content: string;
  createdAt: Date;
  admin: AdminDTOProps;
}

export class ReportAnswerDTO {
  @Property({ apiProperty: { type: 'string', description: '신고 답변 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '신고 답변 내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', description: '신고 답변 생성일' } })
  createdAt: Date;

  @Property({ apiProperty: { type: AdminDTO, description: '신고 답변 관리자' } })
  admin: AdminDTO;

  constructor(props: ReportAnswerDTOProps) {
    this.id = props.id;
    this.content = props.content;
    this.createdAt = props.createdAt;
    this.admin = new AdminDTO(props.admin);
  }
}
