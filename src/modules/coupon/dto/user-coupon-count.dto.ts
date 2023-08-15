import { Property } from 'cumuco-nestjs';

export interface UserCouponCountDTOProps {
  availableCount: number;
  totalCount: number;
}

export class UserCouponCountDTO {
  @Property({ apiProperty: { type: 'number', description: '적용 가능한 쿠폰' } })
  availableCount: number;

  @Property({ apiProperty: { type: 'number', description: '전체 쿠폰' } })
  totalCount: number;

  constructor(props: UserCouponCountDTOProps) {
    this.availableCount = props.availableCount;
    this.totalCount = props.totalCount;
  }
}
