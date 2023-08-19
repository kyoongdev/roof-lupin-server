import { Property } from 'cumuco-nestjs';

import { CreateRefundDTO, CreateRefundDTOProps } from './create-refund.dto';

export interface UpdatePaymentDTOProps {
  totalCost?: number;
  vatCost?: number;
  discountCost?: number;
  originalCost?: number;
  orderId?: string;
  orderResultId?: string;
  payMethod?: string;
  payedAt?: Date;
  refund?: CreateRefundDTOProps;
  receiptUrl?: string;
  isApproved?: boolean;
  isCanceled?: boolean;
}

export class UpdatePaymentDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '결제 비용' } })
  totalCost?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: 'VAT 금액' } })
  vatCost?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '할인 금액' } })
  discountCost?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '할인가가 적용되지 않은 금액' } })
  originalCost?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '주문번호' } })
  orderId?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '주문 결과 번호' } })
  orderResultId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '결제 방식' } })
  payMethod?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '결제일' } })
  payedAt?: Date;

  @Property({ apiProperty: { type: CreateRefundDTO, nullable: true, description: '환불 금액' } })
  refund?: CreateRefundDTO;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '영수증 URL' } })
  receiptUrl?: string;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '승인 여부' } })
  isApproved?: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '취소 여부' } })
  isCanceled?: boolean;

  constructor(props?: UpdatePaymentDTOProps) {
    if (props) {
      this.totalCost = props.totalCost;
      this.vatCost = props.vatCost;
      this.discountCost = props.discountCost;
      this.originalCost = props.originalCost;
      this.orderId = props.orderId;
      this.orderResultId = props.orderResultId;
      this.payMethod = props.payMethod;
      this.payedAt = props.payedAt;
      this.refund = props.refund ? new CreateRefundDTO(props.refund) : null;
      this.receiptUrl = props.receiptUrl;
      this.isApproved = props.isApproved;
      this.isCanceled = props.isCanceled;
    }
  }
}
