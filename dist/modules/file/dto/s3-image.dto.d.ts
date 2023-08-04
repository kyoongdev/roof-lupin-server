export interface S3ImageDTOProps {
    key: string;
    url: string;
    inUse?: boolean;
}
export declare class S3ImageDTO {
    key: string;
    url: string;
    inUse?: boolean;
    constructor(props: S3ImageDTOProps);
}
