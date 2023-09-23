import { Property } from 'cumuco-nestjs';

import { UpdateServiceIconDTO, UpdateServiceIconDTOProps } from './update-service-icon.dto';

export interface UpdateServiceDTOProps {
  icons?: UpdateServiceIconDTOProps[];
  name?: string;
}

export class UpdateServiceDTO {
  @Property({ apiProperty: { type: UpdateServiceIconDTO, nullable: true, isArray: true, description: '아이콘 id' } })
  icons?: UpdateServiceIconDTO[];

  @Property({ apiProperty: { type: 'string', nullable: true, description: '이름' } })
  name?: string;

  constructor(props?: UpdateServiceDTOProps) {
    if (props) {
      this.icons = props.icons?.map((icon) => new UpdateServiceIconDTO(icon));
      this.name = props.name;
    }
  }
}
