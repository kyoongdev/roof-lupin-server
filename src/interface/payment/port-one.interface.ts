import { BANK_CODE } from '@/common/constants';

export interface PortOnePreparePayment {
  /** 가맹점 주문번호 */
  merchant_uid: string;
  /** 결제 예정 금액 */
  amount: number;
}

export interface PortOneGetToken {
  /** REST API 키 */
  imp_key: string;
  /** REST API Secret */
  imp_secret: string;
}
export interface PortOneToken {
  access_token: string;
  expried_at: number;
  now: number;
}
export interface PortOneCertification {
  name: string;
  gender: string;
  birth: string;
  unique_key: string;
  unique_in_site: string;
}

export interface CancelPortOnePayment {
  /** 환불 사유 */
  reason: string;
  imp_uid: string;
  /** 환불 금액 */
  amount: number;
  /** 환불 가능 금액 */
  checksum: number;
}

export interface PortOneValidateAccount {
  bank_code: keyof typeof BANK_CODE;
  bank_num: string;
  bank_holder: string;
}
export interface PortOneValidatedAccount {
  bank_holder: string;
}

export type ProtOneResponse<T> = {
  code: number;
  message: string;
  response: T;
};
