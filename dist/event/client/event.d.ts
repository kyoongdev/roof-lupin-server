import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class ClientRevalidateEvent {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    revalidateClient(): void;
}
