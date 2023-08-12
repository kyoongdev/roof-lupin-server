import { Property } from 'cumuco-nestjs';

export interface HistoryDTOProps {
  id: string;
  content: string;
  writtenAt: Date;
}

export class HistoryDTO {
  @Property({ apiProperty: { type: 'string', description: 'id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '작성일' } })
  writtenAt: Date;

  constructor(props: HistoryDTOProps) {
    this.id = props.id;
    this.content = props.content;
    this.writtenAt = props.writtenAt;
  }
}
