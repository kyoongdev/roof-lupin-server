import { Property } from 'wemacu-nestjs';

import { CommonUserDTO, type CommonUserProps } from '@/modules/user/dto';

import { CurationDTO, type CurationDTOProps } from './curation.dto';

export interface CurationDetailDTOProps extends CurationDTOProps {
  content: string;
  user: CommonUserProps;
}

export class CurationDetailDTO extends CurationDTO {
  @Property({ apiProperty: { type: 'string', description: '큐레이션 내용' } })
  content: string;

  @Property({ apiProperty: { type: CommonUserDTO, description: '큐레이션 작성자' } })
  user: CommonUserDTO;

  constructor(props: CurationDetailDTOProps) {
    super(props);
    this.content = props.content;
    this.user = new CommonUserDTO(props.user);
  }
}
