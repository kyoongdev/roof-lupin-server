import { Property } from 'cumuco-nestjs';

export interface BlockHostDTOProps {
  unBlockAt: Date;
}

export class BlockHostDTO {
  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '차단 해제일' } })
  unBlockAt: Date;

  constructor(props?: BlockHostDTOProps) {
    if (props) {
      this.unBlockAt = props.unBlockAt;
    }
  }
}
