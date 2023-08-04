export interface SearchRecordDTOProps {
    id: string;
    content: string;
    userId: string;
    createdAt: Date;
}
export declare class SearchRecordDTO {
    id: string;
    content: string;
    userId: string;
    createdAt: Date;
    constructor(props: SearchRecordDTOProps);
}
