export interface PortOnePreparePayment {
    merchant_uid: string;
    amount: number;
}
export interface PortOneGetToken {
    imp_key: string;
    imp_secret: string;
}
export interface PortOneToken {
    access_token: string;
    expried_at: number;
    now: number;
}
export interface PortOneGetPayment {
    imp_uid: string;
}
export interface CancelHistory {
    pg_tid: string;
    amount: number;
    cancelled_at: number;
    reason: string;
    receipt_url: string;
}
export interface PortOnePayment {
    imp_uid: string;
    merchant_uid: string;
    pay_method: string;
    channel: string;
    pg_provider: string;
    emb_pg_provider: string;
    pg_tid: string;
    pg_id: string;
    escrow: true;
    apply_num: string;
    bank_code: string;
    bank_name: string;
    card_code: string;
    card_name: string;
    card_quota: number;
    card_number: string;
    card_type: number;
    vbank_code: string;
    vbank_name: string;
    vbank_num: string;
    vbank_holder: string;
    vbank_date: number;
    vbank_issued_at: number;
    name: string;
    amount: number;
    cancel_amount: number;
    currency: string;
    buyer_name: string;
    buyer_email: string;
    buyer_tel: string;
    buyer_addr: string;
    buyer_postcode: string;
    custom_data: string;
    user_agent: string;
    status: string;
    started_at: number;
    paid_at: number;
    failed_at: number;
    cancelled_at: number;
    fail_reason: string;
    cancel_reason: string;
    receipt_url: string;
    cancel_history: CancelHistory[];
    cancel_receipt_urls: string[];
    cash_receipt_issued: true;
    customer_uid: string;
    customer_uid_usage: string;
}
export interface CancelPortOnePayment {
    reason: string;
    imp_uid: string;
    amount: number;
    checksum: number;
}
export type ProtOneResponse<T> = {
    code: number;
    message: string;
    response: T;
};
