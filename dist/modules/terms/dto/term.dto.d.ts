export interface TermDTOProps {
    id: string;
    content?: string;
    name: string;
}
export declare class TermDTO {
    id: string;
    name: string;
    content?: string;
    constructor(props: TermDTOProps);
}
