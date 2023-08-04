export declare class EncryptProvider {
    comparePassword(salt: string, password: string, hashedPassword: string): boolean;
    hashPassword(salt: string, password: string): string;
    createSalt(): string;
}
