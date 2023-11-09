import { Property } from 'cumuco-nestjs';

export interface IsAdminExistsDTOProps {
  isExists: boolean;
}

export class IsAdminExistsDTO {
  @Property({ apiProperty: { type: 'boolean' } })
  isExists: boolean;

  constructor(props: IsAdminExistsDTOProps) {
    this.isExists = props.isExists;
  }
}
