import { Property } from 'wemacu-nestjs';

import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';

import { AdminCouponDTO, AdminCouponDTOProps } from './admin-coupon.dto';
import { CouponDTO, CouponDTOProps } from './coupon.dto';

export interface UserAdminCouponDTOProps {
  id: string;
  count: number;
  dueDateStartAt: Date;
  dueDateEndAt: Date;
  isUsed: boolean;
  createdAt: Date;
  user: CommonUserProps;
  coupon: AdminCouponDTOProps;
  reservationId?: string;
}

export class UserAdminCouponDTO {
  @Property({ apiProperty: { type: 'string', description: '유저 쿠폰 id' } })
  id: string;

  @Property({ apiProperty: { type: 'number', description: '쿠폰 개수' } })
  count: number;

  @Property({ apiProperty: { type: 'date', description: '쿠폰 만료 시작일' } })
  dueDateStartAt: Date;

  @Property({ apiProperty: { type: 'date', description: '쿠폰 만료 종료일' } })
  dueDateEndAt: Date;

  @Property({ apiProperty: { type: 'boolean', description: '쿠폰 사용 여부' } })
  isUsed: boolean;

  @Property({ apiProperty: { type: 'date', description: '쿠폰 생성일' } })
  createdAt: Date;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '예약 id' } })
  reservationId?: string;

  @Property({ apiProperty: { type: CommonUserDTO, description: '유저 정보' } })
  user: CommonUserDTO;

  @Property({ apiProperty: { type: AdminCouponDTO, description: '쿠폰 정보' } })
  coupon: AdminCouponDTO;

  constructor(props: UserAdminCouponDTOProps) {
    this.id = props.id;
    this.count = props.count;
    this.dueDateStartAt = props.dueDateStartAt;
    this.dueDateEndAt = props.dueDateEndAt;
    this.isUsed = props.isUsed;
    this.reservationId = props.reservationId ?? null;
    this.createdAt = props.createdAt;
    this.user = new CommonUserDTO(props.user);
    this.coupon = new AdminCouponDTO(props.coupon);
  }
}
