import { Property } from 'cumuco-nestjs';

export interface IsHostExistsDTOProps {
  isExists: boolean;
}

export class IsHostExistsDTO {
  @Property({ apiProperty: { type: 'boolean' } })
  isExists: boolean;

  constructor(props: IsHostExistsDTOProps) {
    this.isExists = props.isExists;
  }
}
