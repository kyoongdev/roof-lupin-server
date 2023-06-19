export type PaymentMethod =
  | '카드'
  | '가상계좌'
  | '간편결제'
  | '휴대폰'
  | '계좌이체'
  | '문화상품권'
  | '도서문화상품권'
  | '게임문화상품권';
export type FlowMode = 'DEFAULT' | 'DIRECT';
export type PaymentType = 'NORMAL' | 'BILLING' | 'BRANDPAY';
export type Status =
  | 'READY'
  | 'IN_PROGRESS'
  | 'WAITING_FOR_DEPOSIT'
  | 'DONE'
  | 'CANCELED'
  | 'PARTIAL_CANCELED'
  | 'ABORTED'
  | 'EXPIRED';
export type CardType = '신용' | '체크' | '기프트' | '미확인';
export type OwnerType = '개인' | '법인' | '미확인';
export type AcquireStatus = 'READY' | 'REQUESTED' | 'COMPLETED' | 'CANCEL_REQUESTED' | 'CANCELED';
export type InterestPayer = 'BUYER' | 'MERCHANT' | 'CARD_COMPANY';
export type AccountType = '일반' | '고정';
export type RefundStatus = 'NONE' | 'PENDING' | 'FAILED' | 'PARTIAL_FAILED' | 'COMPLETED';

export interface CreateTossPaymentRequest {
  /** 결제 수단 */
  method: PaymentMethod;
  /** 결제 금액 */
  amount: number;
  /** 주문 ID */
  orderId: string;
  /** 성공 redirect url */
  successUrl: string;
  /** 실패 redirect url */
  failUrl: string;
  /** 결제창 유형 */
  flowMode?: string;
  /** 간편결제사 코드 */
  easyPay?: string;
  /** 앱 스킴 */
  appScheme?: string;
}

export interface Cancel {
  /** 결제를 취소한 금액 */
  cancelAmount: number;
  /** 결제를 취소한 이유, 최대 200 */
  cancelReason: string;
  /** 취소된 금액 중 면세 금액 */
  taxFreeAmount: number;
  /** 취소된 금액 중 과세 제외 금액 */
  taxExemptionAmount: number;
  /** 결제 취소 후 환불 가능한 잔액 */
  refundableAmount: number;
  /** 간편결제 서비스의 포인트, 즉시할인과 같은 적립식 결제수단에서 취소된 금액 */
  easyPayDiscountAmount: number;
  /** 결제 취소가 일어난 날짜와 시간 정보 */
  canceledAt: string;
  /** 취소 건의 키 값 */
  transactionKey: string;
  /** 취소 건의 현금영수증 키 값 */
  receiptKey: string;
}

export interface Card {
  /** 카드로 결제한 금액 */
  amount: number;
  /** 카드 발급사 숫자 코드 */
  issuerCode: string;
  /** 카드 매입사 숫자 코드*/
  acquirerCode: string;
  /** 카드 번호 */
  number: number;
  /** 할부 개월 수 */
  installmentPlanMonths: number;
  /** 카드사 승인 번호 */
  approveNo: string;
  /** 카드사 포인트 사용 여부 */
  useCardPoint: boolean;
  /** 카드 종류 */
  cardType: CardType;
  /** 카드의 소유자 타입 */
  ownerType: OwnerType;
  /** 카드 결제의 매입 상태 */
  acquireStatus: AcquireStatus;
  /** 무이자 할부 적용 여부 */
  isInterestFree: boolean;
  /** 무이자 할부가 적용된 결제에서 할부 수수료를 부담하는 주체 */
  interestPayer?: InterestPayer;
}
export interface VirtualAccount {
  /** 가상계좌 타입 */
  accountType: AccountType;
  /** 발급된 계좌번호 */
  accountNumber: string;
  /** 가상계좌 은행 숫자 코드 */
  bankCode: string;
  /** 가상계좌를 발급한 고객 이름 */
  customerName: string;
  /** 입금 기한 */
  dueDate: string;
  /** 환불 처리 상태 */
  refundStatus: RefundStatus;
  /** 가상계좌 만료 여부 */
  expired: boolean;
  /** 정산 상태 */
  settlementStatus: string;
  /** 환불계좌 정보 */
  refundReceiveAccount: any;
}

export interface Payment {
  /** 객체의 응답 버전 */
  version: string;
  /** 결제의 키 값 */
  paymentKey: string;
  /** 결제 타입 정보 */
  type: PaymentType;
  /** 주문 ID */
  orderId: string;
  /** 주문명 */
  orderName: string;
  /** 상점아이디 */
  mId: string;
  /** 사용한 통화 */
  currency: string;
  /** 결제수단 */
  method: PaymentMethod;
  /** 총 결제 금액 */
  totalAmount: number;
  /** 취소할 수 있는 금액 */
  balanceAmount: number;
  /** 결제 처리 상태 */
  status: Status;
  /** 결제가 일어난 날짜와 시간 정보 */
  requestedAt: string;
  /** 결제 승인이 일어난 날짜와 시간 정보 */
  approvedAt: string;
  /** 에스크로 사용 여부 */
  useEscrow: boolean;
  /** 마지막 거래의 키 값 */
  lastTransactionKey?: string;
  /** 공급가액 */
  suppliedAmount: number;
  /** 부가세 */
  vat: number;
  /** 문화비 지출여부 */
  cultureExpense: boolean;
  /** 결제 금액 중 면세 금액 */
  taxFreeAmount: number;
  /** 과세를 제외한 결제 금액 */
  taxExemptionAmount: number;
  /** 결제 취소 이력 */
  cancels: Cancel[];
  /** 부분 최소 가능 여부 */
  isPartialCancelable: boolean;
  /** 카드 관련 정보 */
  card?: Card;
  /** 가상계좌 관련 정보 */
  virtualAccount?: VirtualAccount;
}
