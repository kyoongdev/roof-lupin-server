import { Property } from 'cumuco-nestjs';

import { CommonUserDTO, type CommonUserDTOProps } from '@/modules/user/dto';

import { CurationDTO, type CurationDTOProps } from './curation.dto';

export interface CurationDetailDTOProps extends CurationDTOProps {
  content: string;
  user?: CommonUserDTOProps;
}

export class CurationDetailDTO extends CurationDTO {
  @Property({ apiProperty: { type: 'string', description: '큐레이션 내용' } })
  content: string;

  @Property({ apiProperty: { type: CommonUserDTO, nullable: true, description: '큐레이션 작성자' } })
  user?: CommonUserDTO;

  constructor(props: CurationDetailDTOProps) {
    super(props);
    this.content = props.content;
    this.user = props.user ? new CommonUserDTO(props.user) : null;
  }
}
