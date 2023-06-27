import { Property } from 'wemacu-nestjs';

export interface UpdateUserCouponDTOProps {
  count?: number;

  isUsed?: boolean;
}

export class UpdateUserCouponDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '쿠폰 개수' } })
  count?: number;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '쿠폰 사용 여부' } })
  isUsed?: boolean;

  constructor(props?: UpdateUserCouponDTOProps) {
    if (props) {
      this.count = props.count;
      this.isUsed = props.isUsed;
    }
  }
}
