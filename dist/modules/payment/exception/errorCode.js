"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAYMENT_ERROR_CODE = exports.PAYMENT_ADDITIONAL_SERVICE_MAX_COUNT = exports.PAYMENT_NOT_APPROVED = exports.PAYMENT_IMMEDIATE_PAYMENT_REQUIRED = exports.PAYMENT_IMMEDIATE_PAYMENT_FORBIDDEN = exports.PAYMENT_MERCHANT_UID_BAD_REQUEST = exports.PAYMENT_REFUND_DUE_DATE_PASSED = exports.PAYMENT_ALREADY_REFUNDED = exports.PAYMENT_NOT_COMPLETED = exports.PAYMENT_MUTATION_FORBIDDEN = exports.PAYMENT_REFUND_FORBIDDEN = exports.PAYMENT_SPACE_ID_BAD_REQUEST = exports.PAYMENT_DISCOUNT_COST_BAD_REQUEST = exports.PAYMENT_COUPON_COUNT_ZERO = exports.PAYMENT_COUPON_IS_USED = exports.PAYMENT_COUPON_DUE_DATE_BEFORE = exports.PAYMENT_COUPON_DUE_DATE_EXPIRED = exports.PAYMENT_PAY_METHOD_BAD_REQUEST = exports.PAYMENT_ORDER_RESULT_ID_BAD_REQUEST = exports.PAYMENT_CONFLICT = exports.PAYMENT_DATE_BAD_REQUEST = exports.PAYMENT_INTERNAL_SERVER_ERROR = exports.PAYMENT_RENTAL_TYPE_INTERNAL_SERVER_ERROR = exports.PAYMENT_TOTAL_COST_BAD_REQUEST = void 0;
const common_1 = require("@nestjs/common");
exports.PAYMENT_TOTAL_COST_BAD_REQUEST = '결제 비용을 다시 확인해주세요.';
exports.PAYMENT_RENTAL_TYPE_INTERNAL_SERVER_ERROR = '대여하려는 상품에 문제가 있습니다.';
exports.PAYMENT_INTERNAL_SERVER_ERROR = '결제에 문제가 생겼습니다.';
exports.PAYMENT_DATE_BAD_REQUEST = '대여 날짜 혹은 시간을 다시 확인해주세요.';
exports.PAYMENT_CONFLICT = '예약이 불가합니다.';
exports.PAYMENT_ORDER_RESULT_ID_BAD_REQUEST = '주문결과를 다시 확인해주세요.';
exports.PAYMENT_PAY_METHOD_BAD_REQUEST = '결제 수단(pg, toss, kakao)을 다시 확인해주세요.';
exports.PAYMENT_COUPON_DUE_DATE_EXPIRED = '쿠폰 사용 일자가 지났습니다.';
exports.PAYMENT_COUPON_DUE_DATE_BEFORE = '쿠폰 사용 일자가 아닙니다.';
exports.PAYMENT_COUPON_IS_USED = '이미 쿠폰을 사용했습니다.';
exports.PAYMENT_COUPON_COUNT_ZERO = '사용 가능한 쿠폰이 없습니다.';
exports.PAYMENT_DISCOUNT_COST_BAD_REQUEST = '할인 비용을 다시 확인해주세요.';
exports.PAYMENT_SPACE_ID_BAD_REQUEST = '공간 정보가 일치하지 않습니다..';
exports.PAYMENT_REFUND_FORBIDDEN = '환불 권한이 없습니다.';
exports.PAYMENT_MUTATION_FORBIDDEN = '수정/삭제 권한이 없습니다.';
exports.PAYMENT_NOT_COMPLETED = '아직 결제가 완료되지 않았습니다.';
exports.PAYMENT_ALREADY_REFUNDED = '이미 환불된 결제입니다.';
exports.PAYMENT_REFUND_DUE_DATE_PASSED = '환불 기간이 지났습니다.';
exports.PAYMENT_MERCHANT_UID_BAD_REQUEST = '주문번호를 다시 확인해주세요.';
exports.PAYMENT_IMMEDIATE_PAYMENT_FORBIDDEN = '즉시 결제가 불가한 공간입니다.';
exports.PAYMENT_IMMEDIATE_PAYMENT_REQUIRED = '즉시 결제가 필요한 공간입니다.';
exports.PAYMENT_NOT_APPROVED = '아직 예약 승인이 되지 않았습니다.';
exports.PAYMENT_ADDITIONAL_SERVICE_MAX_COUNT = '추가 서비스는 최대 개수가 넘었습니다.';
exports.PAYMENT_ERROR_CODE = {
    BAD_REQUEST: (message = 'BAD_REQUEST') => ({
        code: common_1.HttpStatus.BAD_REQUEST,
        message,
    }),
    INTERNAL_SERVER_ERROR: (message = 'INTERNAL_SERVER_ERROR') => ({
        code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        message,
    }),
    CONFLICT: (message = 'CONFLICT') => ({
        code: common_1.HttpStatus.CONFLICT,
        message,
    }),
    FORBIDDEN: (message = 'FORBIDDEN') => ({
        code: common_1.HttpStatus.FORBIDDEN,
        message,
    }),
};
//# sourceMappingURL=errorCode.js.map