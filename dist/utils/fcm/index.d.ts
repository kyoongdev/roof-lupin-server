import { SendMessage } from '@/interface/fcm.interface';
export declare class FCMProvider {
    private readonly firebaseApp;
    sendMessage(props: SendMessage): Promise<void>;
    sendMessages(props: SendMessage[]): Promise<void>;
}
