import { Property } from 'cumuco-nestjs';

import { TermResDecorator } from '@/utils/validation/terms.validation';

export interface TermDTOProps {
  content?: string;
  name: string;
}

export class TermDTO {
  @TermResDecorator()
  name: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '내용' } })
  content?: string;

  constructor(props: TermDTOProps) {
    this.content = props.content;
    this.name = props.name;
  }
}
