import { CreatePaymentDTO } from '@/modules/reservation/dto';
import { SpaceDetailDTO } from '@/modules/space/dto';
import { RentalTypeDTO } from '@/modules/space/dto/rental-type';
import { EscrowProductDTO, EscrowProductDTOProps } from './escrow-product.dto';
import { ProductDTO, ProductDTOProps } from './product.dto';
export interface PaymentPayloadDTOProps {
    amount: number;
    orderId: string;
    orderName: string;
    successUrl: string;
    failUrl: string;
    customerEmail?: string;
    customerName?: string;
    appScheme?: string;
    taxFreeAmount?: number;
    taxExemptionAmount?: number;
    cultureExpense?: boolean;
    useEscrow?: boolean;
    escrowProducts?: EscrowProductDTOProps[];
    customerMobilePhone?: string;
    mobileCarrier?: string[];
    products?: ProductDTOProps[];
}
export declare class PaymentPayloadDTO {
    amount: number;
    orderId: string;
    orderName: string;
    successUrl: string;
    failUrl: string;
    customerEmail?: string;
    customerName?: string;
    appScheme?: string;
    taxFreeAmount?: number;
    taxExemptionAmount?: number;
    cultureExpense?: boolean;
    useEscrow?: boolean;
    escrowProducts?: EscrowProductDTO[];
    customerMobilePhone?: string;
    mobileCarrier?: string[];
    products?: ProductDTO[];
    constructor(props: PaymentPayloadDTOProps);
    static generatePaymentPayload(space: SpaceDetailDTO, orderId: string, rentalTypes: RentalTypeDTO[], props: CreatePaymentDTO): PaymentPayloadDTO;
}
