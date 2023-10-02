import { Property } from 'cumuco-nestjs';

export interface DateDTOProps {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export class DateDTO {
  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  createdAt: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  updatedAt: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time', nullable: true } })
  deletedAt: Date;

  constructor(props?: DateDTOProps) {
    if (props) {
      this.createdAt = props.createdAt;
      this.updatedAt = props.updatedAt;
      this.deletedAt = props.deletedAt;
    }
  }
}
