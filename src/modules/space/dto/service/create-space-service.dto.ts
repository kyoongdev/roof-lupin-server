import { Property } from 'cumuco-nestjs';

export interface CreateSpaceServiceDTOProps {
  id: string;
}

export class CreateSpaceServiceDTO {
  @Property({ apiProperty: { type: 'string', description: '시설 아이콘 경로' } })
  id: string;

  constructor(props?: CreateSpaceServiceDTOProps) {
    if (props) {
      this.id = props.id;
    }
  }
}
