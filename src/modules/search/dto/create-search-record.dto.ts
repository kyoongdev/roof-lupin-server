import { Property } from 'wemacu-nestjs';

export interface CreateSearchRecordDTOProps {
  content: string;
}

export class CreateSearchRecordDTO {
  @Property({ apiProperty: { type: 'string', description: '검색어' } })
  content: string;

  constructor(props?: CreateSearchRecordDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
