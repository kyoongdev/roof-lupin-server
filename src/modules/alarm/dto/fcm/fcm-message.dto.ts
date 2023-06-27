import { Property } from 'wemacu-nestjs';

export interface FCMMessageDTOProps {
  body: string;
  title: string;
}

export class FCMMessageDTO {
  @Property({ apiProperty: { type: 'string', description: '내용' } })
  body: string;

  @Property({ apiProperty: { type: 'string', description: '제목' } })
  title: string;

  constructor(props?: FCMMessageDTOProps) {
    if (props) {
      this.body = props.body;
      this.title = props.title;
    }
  }
}
