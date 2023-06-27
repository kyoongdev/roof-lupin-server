import { Property } from 'wemacu-nestjs';

export interface SendFCMMessageDTOProps {
  body: string;
  title: string;
}

export class SendFCMMessageDTO {
  @Property({ apiProperty: { type: 'string', description: '' } })
  body: string;

  @Property({ apiProperty: { type: 'string', description: '' } })
  title: string;

  constructor(props?: SendFCMMessageDTOProps) {
    if (props) {
      this.body = props.body;
      this.title = props.title;
    }
  }
}
