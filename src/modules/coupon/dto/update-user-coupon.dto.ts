import { Property } from 'wemacu-nestjs';

export interface UpdateUserCouponDTOProps {
  count?: number;
  dueDate?: Date;
  isUsed?: boolean;
}

export class UpdateUserCouponDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '쿠폰 개수' } })
  count?: number;

  @Property({ apiProperty: { type: 'date', nullable: true, description: '쿠폰 만료일' } })
  dueDate?: Date;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '쿠폰 사용 여부' } })
  isUsed?: boolean;

  constructor(props: UpdateUserCouponDTOProps) {
    this.count = props.count;
    this.dueDate = props.dueDate;
    this.isUsed = props.isUsed;
  }
}
