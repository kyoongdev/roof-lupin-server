import type { YOrN } from './_shared.interface';
export type Card = 'SHINHAN' | 'KB' | 'HYUNDAI' | 'LOTTE' | 'SAMSUNG' | 'NH' | 'BC' | 'HANA' | 'CITI' | 'KAKAOBANK' | 'KAKAOPAY';
export type PaymentMethodType = 'CARD' | 'MONEY';
export type PaymentActionType = 'PAYMENT' | 'CANCEL' | 'ISSUED_SID';
export type PaymentStatus = 'READY' | 'SEND_TMS' | 'OPEN_PAYMENT' | 'SELECT_METHOD' | 'ARS_WAITING' | 'AUTH_PASSWORD' | 'ISSUED_SID' | 'SUCCESS_PAYMENT' | 'PART_CANCEL_PAYMENT' | 'CANCEL_PAYMENT' | 'FAIL_AUTH_PASSWORD' | 'QUIT_PAYMENT' | 'FAIL_PAYMENT';
export interface KakaoPayReadyRequest {
    cid?: string;
    cid_secret?: string;
    partner_order_id?: string;
    partner_user_id?: string;
    item_name: string;
    item_code?: string;
    quantity: number;
    total_amount: number;
    tax_free_amount: number;
    vat_amount?: number;
    green_deposit?: number;
    approval_url?: string;
    cancel_url?: string;
    fail_url?: string;
    available_cards?: Card[];
    payment_method_type?: PaymentMethodType;
    install_month?: number;
    custom_json?: Record<string, string>;
}
export interface KakaoPayReadyResponse {
    tid: string;
    next_redirect_app_url: string;
    next_redirect_mobile_url: string;
    next_redirect_pc_url: string;
    android_app_scheme: string;
    ios_app_scheme: string;
    created_at: string;
}
export interface KakaoPayApproveRequest {
    cid?: string;
    cid_secret?: string;
    tid: string;
    partner_order_id?: string;
    partner_user_id?: string;
    pg_token: string;
    payload?: string;
    total_amount?: number;
}
export interface Amount {
    total: number;
    tax_free: number;
    vat: number;
    point: number;
    discount: number;
    green_deposit: number;
}
export interface CardInfo {
    purchase_corp: string;
    purchase_corp_code: string;
    issuer_corp: string;
    issuer_corp_code: string;
    kakaopay_purchase_corp: string;
    kakaopay_purchase_corp_code: string;
    kakaopay_issuer_corp: string;
    kakaopay_issuer_corp_code: string;
    bin: string;
    card_type: string;
    install_month: string;
    approved_id: string;
    card_mid: string;
    interest_free_install: string;
    card_item_code: string;
}
export interface KakaoPayApproveResponse {
    aid: string;
    tid: string;
    cid: string;
    sid: string;
    partner_order_id: string;
    partner_user_id: string;
    payment_method_type: PaymentMethodType;
    amount: Amount;
    card_info?: CardInfo;
    item_name: string;
    item_code: string;
    quantity: number;
    created_at: Date;
    approved_at: Date;
    payload: string;
}
export interface KakaoPayOrderDetailRequestQuery {
    cid: string;
    cid_secret?: string;
    tid: string;
}
export interface CanceledAmount {
    total: number;
    tax_free: number;
    vat: number;
    point: number;
    discount: number;
    green_deposit: number;
}
export interface CanceledAvailableAmount {
    total: number;
    tax_free: number;
    vat: number;
    point: number;
    discount: number;
    green_deposit: number;
}
export interface SelectedCardInfo {
    card_bin: string;
    install_month: number;
    card_corp_name: string;
    interest_free_install: YOrN;
}
export interface PaymentActionDetails {
    aid: string;
    approved_at: string;
    amount: number;
    point_amount: number;
    discount_amount: number;
    green_deposit: number;
    payment_action_type: PaymentActionType;
    payload: string;
}
export interface KakaoPayOrderDetailResponse {
    tid: string;
    cid: string;
    status: PaymentStatus;
    partner_order_id: string;
    partner_user_id: string;
    payment_method_type: PaymentMethodType;
    amount: Amount;
    canceled_amount: CanceledAmount;
    cancel_available_amount: CanceledAvailableAmount;
    item_name: string;
    item_code: string;
    quantity: number;
    created_at: Date;
    approved_at: Date;
    canceled_at: Date;
    selected_card_info: SelectedCardInfo;
    payment_action_details: PaymentActionDetails[];
}
export interface KakaoPayCancelRequest {
    cid?: string;
    cid_secret?: string;
    tid: string;
    cancel_amount: number;
    cancel_tax_free_amount: number;
    cancel_vat_amount?: number;
    cancel_available_amount?: number;
    payload?: string;
}
export interface ApprovedCancelAmount {
    total: number;
    tax_free: number;
    vat: number;
    point: number;
    discount: number;
    green_deposit: number;
}
export interface KakaoPayCancelResponse {
    aid: string;
    tid: string;
    cid: string;
    status: PaymentStatus;
    partner_order_id: string;
    partner_user_id: string;
    payment_method_type: PaymentMethodType;
    amount: Amount;
    approved_cancel_amount: ApprovedCancelAmount;
    canceled_amount: CanceledAmount;
    cancel_available_amount: CanceledAvailableAmount;
    item_name: string;
    item_code: string;
    quantity: number;
    created_at: Date;
    approved_at: Date;
    canceled_at: Date;
    payload: string;
}
