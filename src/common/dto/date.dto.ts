import { Property } from 'wemacu-nestjs';

export interface DateProps {
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
}
