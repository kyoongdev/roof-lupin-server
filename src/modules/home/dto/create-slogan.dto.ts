import { Property } from 'wemacu-nestjs';

interface CreateSloganDTOProps {
  content: string;
  isDefault?: boolean;
}

export class CreateSloganDTO {
  @Property({ apiProperty: { type: 'string', description: '슬로건' } })
  content: string;

  @Property({ apiProperty: { type: 'boolean', description: '슬로건 기본 설정 유무', nullable: true } })
  isDefault?: boolean;

  constructor(props?: CreateSloganDTOProps) {
    if (props) {
      this.content = props.content;
      this.isDefault = props.isDefault;
    }
  }
}
