export declare const Role: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
    readonly HOST: "HOST";
};
export type RoleType = (typeof Role)[keyof typeof Role];
export interface TokenPayloadProps {
    id: string;
    role: RoleType;
}
export interface TokenPayload {
    id: string;
    role: RoleType;
    key: string;
}
export declare enum INTERVAL_WEEK {
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4
}
