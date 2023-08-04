export type PaymentMethod = '카드' | '가상계좌' | '간편결제' | '휴대폰' | '계좌이체' | '문화상품권' | '도서문화상품권' | '게임문화상품권';
export type FlowMode = 'DEFAULT' | 'DIRECT';
export type PaymentType = 'NORMAL' | 'BILLING' | 'BRANDPAY';
export type Status = 'READY' | 'IN_PROGRESS' | 'WAITING_FOR_DEPOSIT' | 'DONE' | 'CANCELED' | 'PARTIAL_CANCELED' | 'ABORTED' | 'EXPIRED';
export type CardType = '신용' | '체크' | '기프트' | '미확인';
export type OwnerType = '개인' | '법인' | '미확인';
export type AcquireStatus = 'READY' | 'REQUESTED' | 'COMPLETED' | 'CANCEL_REQUESTED' | 'CANCELED';
export type InterestPayer = 'BUYER' | 'MERCHANT' | 'CARD_COMPANY';
export type AccountType = '일반' | '고정';
export type RefundStatus = 'NONE' | 'PENDING' | 'FAILED' | 'PARTIAL_FAILED' | 'COMPLETED';
export type SettlementStatus = 'INCOMPLETED' | 'COMPLETED';
export type CashReceiptType = '소득공제' | '지출증빙' | '미발행';
export type TransactionType = 'CONFIRM' | 'CANCEL';
export type IssueStatus = 'IN_PROGRESS' | 'COMPLETE' | 'FAILED';
export interface TossCreatePaymentRequest {
    method: PaymentMethod;
    amount: number;
    orderId: string;
    successUrl?: string;
    failUrl?: string;
    flowMode?: string;
    easyPay?: string;
    appScheme?: string;
    orderName: string;
}
export interface TossConfirmPayment {
    paymentKey: String;
    orderId: string;
    amount: number;
}
export interface TossCancelPayment {
    cancelReason: string;
    cancelAmount: number;
    refundReceiveAccount?: RefundReceiveAccount;
}
export interface RefundReceiveAccount {
    bank: string;
    accountNumber: string;
    holderName: string;
}
export interface Cancel {
    cancelAmount: number;
    cancelReason: string;
    taxFreeAmount: number;
    taxExemptionAmount: number;
    refundableAmount: number;
    easyPayDiscountAmount: number;
    canceledAt: string;
    transactionKey: string;
    receiptKey: string;
}
export interface Card {
    amount: number;
    issuerCode: string;
    acquirerCode: string;
    number: number;
    installmentPlanMonths: number;
    approveNo: string;
    useCardPoint: boolean;
    cardType: CardType;
    ownerType: OwnerType;
    acquireStatus: AcquireStatus;
    isInterestFree: boolean;
    interestPayer?: InterestPayer;
}
export interface VirtualAccount {
    accountType: AccountType;
    accountNumber: string;
    bankCode: string;
    customerName: string;
    dueDate: string;
    refundStatus: RefundStatus;
    expired: boolean;
    settlementStatus: string;
    refundReceiveAccount: any;
}
export interface MobilePhone {
    customerMobilePhone: string;
    settlementStatus: SettlementStatus;
    receiptUrl: string;
}
export interface GiftCertificate {
    approveNo: string;
    settlementStatus: SettlementStatus;
}
export interface Transfer {
    bankCode: string;
    settlementStatus: SettlementStatus;
}
export interface Receipt {
    url: string;
}
export interface Checkout {
    url: string;
}
export interface EasyPay {
    provider: string;
    amount: number;
    discountAmount: number;
}
export interface Failure {
    code: string;
    message: string;
}
export interface CashReceipt {
    type: CashReceiptType;
    receiptKey: string;
    issueNumber: string;
    receiptUrl: string;
    amount: number;
    taxFreeAmount: number;
}
export interface CashReceipts {
    receiptKey: string;
    orderId: string;
    orderName: string;
    type: CashReceiptType;
    issueNumber: string;
    receiptUrl: string;
    businessNumber: string;
    transactionType: TransactionType;
    amount: number;
    taxFreeAmount: number;
    issueStatus: IssueStatus;
    failure: Failure;
    customerIdentityNumber: string;
    requestedAt: string;
}
export interface Discount {
    amount: number;
}
export interface Payment {
    version: string;
    paymentKey: string;
    type: PaymentType;
    orderId: string;
    orderName: string;
    mId: string;
    currency: string;
    method: PaymentMethod;
    totalAmount: number;
    balanceAmount: number;
    status: Status;
    requestedAt: string;
    approvedAt: string;
    useEscrow: boolean;
    lastTransactionKey?: string;
    suppliedAmount: number;
    vat: number;
    cultureExpense: boolean;
    taxFreeAmount: number;
    taxExemptionAmount: number;
    cancels: Cancel[];
    isPartialCancelable: boolean;
    card?: Card;
    virtualAccount?: VirtualAccount;
    secret?: string;
    mobilePhone?: MobilePhone;
    giftCertificate?: GiftCertificate;
    transfer?: Transfer;
    receipt?: Receipt;
    checkout?: Checkout;
    easyPay?: EasyPay;
    country: string;
    failure?: Failure;
    cashReceipt?: CashReceipt;
    cashReceipts?: CashReceipts[];
    discount?: Discount;
}
