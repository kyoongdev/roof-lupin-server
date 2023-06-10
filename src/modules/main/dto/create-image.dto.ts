import { Property } from 'wemacu-nestjs';

interface Props {
  url: string;
  isDefault?: boolean;
}

export class CreateMainImageDTO {
  @Property({ apiProperty: { type: 'string', description: '홈 배경 이미지 url' } })
  url: string;

  @Property({ apiProperty: { type: 'boolean', description: '기본 배경 설정 유무', nullable: true } })
  isDefault?: boolean;

  constructor(props?: Props) {
    if (props) {
      this.url = props.url;
      this.isDefault = props.isDefault;
    }
  }
}
