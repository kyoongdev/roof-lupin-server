import { Property } from 'cumuco-nestjs';

export interface UpdateSpaceServiceDTOProps {
  id: string;
}

export class UpdateSpaceServiceDTO {
  @Property({ apiProperty: { type: 'string', description: '시설 아이콘 경로' } })
  id: string;

  constructor(props?: UpdateSpaceServiceDTOProps) {
    if (props) {
      this.id = props.id;
    }
  }
}
