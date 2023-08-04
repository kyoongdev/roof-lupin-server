import { Property } from 'cumuco-nestjs';

import { TermResDecorator } from '@/utils/validation/terms.validation';

export interface TermDTOProps {
  id: string;
  content?: string;
  name: string;
}

export class TermDTO {
  @Property({ apiProperty: { type: 'string', description: '약관 id' } })
  id: string;

  @TermResDecorator()
  name: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '내용' } })
  content?: string;

  constructor(props: TermDTOProps) {
    this.id = props.id;
    this.content = props.content;
    this.name = props.name;
  }
}
