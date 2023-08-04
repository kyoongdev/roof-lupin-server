export interface SizeDTOProps {
    id: string;
    size: number;
    floor: number;
    isRoof: boolean;
}
export declare class SizeDTO {
    id: string;
    size: number;
    floor: number;
    isRoof: boolean;
    constructor(props: SizeDTOProps);
}
