import { Property } from 'wemacu-nestjs';

export interface SearchRecordDTOProps {
  id: string;
  content: string;
  createdAt: Date;
}

export class SearchRecordDTO {
  @Property({ apiProperty: { type: 'string', description: 'search record id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '검색어' } })
  content: string;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '검색일자' } })
  createdAt: Date;

  constructor(props: SearchRecordDTOProps) {
    this.id = props.id;
    this.content = props.content;
    this.createdAt = props.createdAt;
  }
}
